import { renderJSONTreeView } from "@ethicdevs/json-tree-view";
import { updatedDiff as diff } from "deep-object-diff";

type DebuggerPacket = {
  _k: string;
  _t: number;
  _d: Record<string, unknown>;
};

export enum WS_READY_STATE {
  Connecting = 0,
  Open = 1,
  Closing = 2,
  Closed = 3,
}

function nestedIncludes(
  obj: Record<string, unknown>,
  toMatch: string,
): boolean {
  const entries = Object.entries(obj);
  const mappedEntries = entries.map(([k, v]): [string, boolean] => {
    if (typeof v === "object") {
      return [k, nestedIncludes(v as any, toMatch)];
    } else if (
      typeof v === "function" ||
      typeof v === "undefined" ||
      typeof v === "symbol" ||
      typeof v === "bigint" ||
      typeof v === "number"
    ) {
      return [k, false];
    } else if (typeof v === "string") {
      return [k, v.includes(toMatch)];
    } else {
      return [k, false];
    }
  });

  return mappedEntries.some(([_, v]) => v === true);
}

function strToBytesLen(str: string): number {
  try {
    return new TextEncoder().encode(str).length;
  } catch (_) {
    return -1;
  }
}

function humanFileSize(bytes: number, si: boolean = false, dp: number = 1) {
  const thresh = si ? 1000 : 1024;
  if (Math.abs(bytes) < thresh) {
    return bytes + " B";
  }
  const units = si
    ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
    : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
  let u = -1;
  const r = 10 ** dp;
  do {
    bytes /= thresh;
    ++u;
  } while (
    Math.round(Math.abs(bytes) * r) / r >= thresh &&
    u < units.length - 1
  );
  return bytes.toFixed(dp) + " " + units[u];
}

function getLogLines(packet: DebuggerPacket, packetBytes: number): string[] {
  const date = new Date(packet._t).toLocaleString();
  const packetType = packet._d?.type;
  const packetSize = humanFileSize(packetBytes);
  const maybeActionType = packetType == null ? "" : `${packetType} => `;
  const content = JSON.stringify(packet._d, null, 2);
  const str = `[${date}] (${packetSize}) => ${maybeActionType}\n${content}`;
  const [firstLine, ...otherLines] = str.split("\n");

  return [firstLine, ...otherLines];
}

/* function makeLogEntry(packet: DebuggerPacket) {
  const date = new Date(packet._t).toLocaleString();
  const packetType = packet._d?.type;
  const maybeActionType = packetType == null ? "" : `${packetType} => `;
  const content = JSON.stringify(packet._d, null, 2);
  const str = `[${date}]: ${maybeActionType}${content}`;
  const [firstLine, ...otherLines] = str.split("\n");

  const node = document.createElement("li");
  const detailsNode = document.createElement("details");
  const summaryNode = document.createElement("summary");
  const preNode = document.createElement("pre");
  const summaryTextNode = document.createTextNode(firstLine);
  const textNode = document.createTextNode(otherLines.join("\n"));

  detailsNode.setAttribute("open", "true");
  detailsNode.classList.add("log");
  detailsNode.classList.add(`log-${packet._k}`);

  summaryNode.appendChild(summaryTextNode);
  preNode.appendChild(textNode);
  detailsNode.appendChild(summaryNode);
  detailsNode.appendChild(preNode);
  node.appendChild(detailsNode);

  return node;
} */

const makeNodeToggleFolding = (allFolded: boolean) => (node: any) => {
  if (allFolded) {
    node.setAttribute("open", true);
  } else {
    node.removeAttribute("open");
  }
};

(function iife(wsUri = "ws://localhost:8080") {
  console.log(`[rgsh-debugger/ui] Hey, will connect to ws on: ${wsUri}`);
  let ws = new WebSocket(wsUri);

  let stats = {
    dispatchedActions: 0,
    stateUpdates: 0,
  };

  let state = {
    actionsAllFolded: false,
    stateAllFolded: false,
    stateDiffMode: false,
    lastStateData: null as null | Record<string, unknown>,
    actionsFilterByValue: "",
    stateFilterByValue: "",
  };

  const wsReadyStateEl = document.querySelector("#ws-ready-state");
  const actionsLog = document.querySelector("#actions-dispatch-wrapper");
  const actionsInputFilter = document.querySelector("#input-filter-actions");
  const actionsDispatchCounter = document.querySelector(
    "#dispatched-actions-counter",
  );
  const actionsToggleFoldingButton = document.querySelector(
    "#btn-action-toggle-folding",
  );

  const stateLog = document.querySelector("#state-updates-wrapper");
  const stateInputFilter = document.querySelector("#input-filter-state");
  const stateUpdatesCounter = document.querySelector("#state-updates-counter");
  const stateDiffModeStatus = document.querySelector("#state-diff-mode");
  const stateToggleFoldingButton = document.querySelector(
    "#btn-state-toggle-folding",
  );
  const stateToggleDiffModeButton = document.querySelector(
    "#btn-state-toggle-diff-mode",
  );

  function log(message: string) {
    if (wsReadyStateEl != null) {
      wsReadyStateEl.textContent = message;
    }
  }

  function wsOpen(_: Event) {
    ws.send("tail");
    log("Connected!");
  }

  function wsError(ev: Event, reconnectWebSocket: () => void) {
    log("Socket error: " + (ev as any).message);
    reconnectWebSocket();
  }

  function wsClose(
    { code, reason }: CloseEvent,
    reconnectWebSocket: () => void,
  ) {
    const tags = [`code=${code || "none"}`, `reason=${reason || "none"}`];
    log(`Connection closed. ${tags.join(" ")}`);
    reconnectWebSocket();
  }

  function wsMessage(ev: MessageEvent<any>) {
    const data: string = ev.data.toString();
    const packet = JSON.parse(data) as DebuggerPacket;
    const packetBytes = strToBytesLen(data);

    if (packet._k === "action") {
      stats.dispatchedActions += 1;
    } else if (packet._k === "state") {
      stats.stateUpdates += 1;
    }

    if (
      packet._k === "state" &&
      state.stateFilterByValue != null &&
      state.stateFilterByValue.trim() !== "" &&
      nestedIncludes(packet._d, state.stateFilterByValue) === false
    ) {
      console.log(
        "includesStateFilter:",
        nestedIncludes(packet._d, state.stateFilterByValue),
      );
      return; // skip
    }

    if (
      packet._k === "action" &&
      state.actionsFilterByValue != null &&
      state.actionsFilterByValue.trim() !== "" &&
      nestedIncludes(packet._d, state.actionsFilterByValue) === false
    ) {
      console.log(
        "includesActionsFilter:",
        nestedIncludes(packet._d, state.actionsFilterByValue),
      );
      return; // skip
    }

    //let logEntry;
    let logLines: string[] = [];
    let nodeToUpdate;

    if (
      packet._k === "state" &&
      state.stateDiffMode === true &&
      state.lastStateData != null
    ) {
      const diffResult = diff(state.lastStateData, packet._d);
      const diffPacket = {
        ...packet,
        _d: diffResult as Record<string, unknown>,
      };

      //logEntry = makeLogEntry(diffPacket);
      logLines = getLogLines(
        diffPacket,
        strToBytesLen(JSON.stringify(diffPacket)),
      );
      nodeToUpdate = stateLog;
    } else {
      //logEntry = makeLogEntry(packet);
      logLines = getLogLines(packet, packetBytes);
      nodeToUpdate = packet._k === "action" ? actionsLog : stateLog;
    }

    if (nodeToUpdate != null) {
      const jsonTreeViewNode = document.createElement("div");
      renderJSONTreeView(packet._d, jsonTreeViewNode, {
        expanded: false,
      });

      const [firstLine] = logLines;
      const firstLineNode = document.createTextNode(firstLine);

      const wrapperNode = document.createElement("div");

      wrapperNode.appendChild(firstLineNode);
      wrapperNode.appendChild(jsonTreeViewNode);

      nodeToUpdate.appendChild(wrapperNode);

      if (nodeToUpdate.parentElement != null) {
        nodeToUpdate.parentElement.scrollTop =
          nodeToUpdate.parentElement.scrollHeight;
      }
    }

    if (actionsDispatchCounter != null) {
      actionsDispatchCounter.textContent = `(${stats.dispatchedActions} dispatches)`;
    }

    if (stateUpdatesCounter != null) {
      stateUpdatesCounter.textContent = `(${stats.stateUpdates} updates)`;
    }

    state.lastStateData = packet._d;
  }

  function recreateWebSocket(
    bindEvents: (socket: WebSocket) => void,
    firstTime?: boolean,
  ): void {
    if (ws.readyState === WS_READY_STATE.Closed) {
      log("Lost connection to debugger. Sleeping 3s before reconnecting...");
    }

    // Try reconnecting every 3s
    let reconnectIntervalId: NodeJS.Timer | null = setInterval(() => {
      if (ws.readyState === WS_READY_STATE.Closed) {
        log(`Trying to ${firstTime ? "re" : ""}connect...`);
        ws = new WebSocket(wsUri);
      } else if (ws.readyState === WS_READY_STATE.Open) {
        if (reconnectIntervalId) {
          clearInterval(reconnectIntervalId);
          reconnectIntervalId = null;
          log(firstTime ? "Connected!" : "Re-connected!");
          bindEvents(ws);
          ws.send("tail");
        }
      }
      return undefined;
    }, 1000 * 3);
    return undefined;
  }

  function bindWsEvents(socket: WebSocket): void {
    socket.onopen = wsOpen;
    socket.onmessage = wsMessage;
    socket.onerror = (ev) => {
      wsError(ev, recreateWebSocket.bind(null, bindWsEvents));
    };
    socket.onclose = (ev) => {
      wsClose(ev, recreateWebSocket.bind(null, bindWsEvents));
    };
  }

  bindWsEvents(ws);
  ws.send("tail");

  actionsInputFilter?.addEventListener("change", function (ev: any) {
    if (ev.target.value != null) {
      state.actionsFilterByValue = ev.target.value;
    }
  });

  stateInputFilter?.addEventListener("change", function (ev: any) {
    if (ev.target.value != null) {
      state.stateFilterByValue = ev.target.value;
    }
  });

  actionsToggleFoldingButton?.addEventListener("click", () => {
    const allActionNodes = document.querySelectorAll(".log-action");
    allActionNodes.forEach(makeNodeToggleFolding(state.actionsAllFolded));
    state.actionsAllFolded = !state.actionsAllFolded;
  });

  stateToggleFoldingButton?.addEventListener("click", () => {
    const allStateNodes = document.querySelectorAll(".log-state");
    allStateNodes.forEach(makeNodeToggleFolding(state.stateAllFolded));
    state.stateAllFolded = !state.stateAllFolded;
  });

  stateToggleDiffModeButton?.addEventListener("click", () => {
    state.stateDiffMode = !state.stateDiffMode;
    if (stateDiffModeStatus != null) {
      stateDiffModeStatus.textContent = state.stateDiffMode ? "On" : "Off";
    }
  });
})();
