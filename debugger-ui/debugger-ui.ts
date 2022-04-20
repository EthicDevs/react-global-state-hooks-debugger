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

function makeLogEntry(packet: DebuggerPacket) {
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
}

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
  const actionsLog = document.querySelector("#actions-dispatch");
  const actionsInputFilter = document.querySelector("#input-filter-actions");
  const actionsDispatchCounter = document.querySelector(
    "#dispatched-actions-counter",
  );
  const actionsToggleFoldingButton = document.querySelector(
    "#btn-action-toggle-folding",
  );

  const stateLog = document.querySelector("#state-updates");
  const stateInputFilter = document.querySelector("#input-filter-state");
  const stateUpdatesCounter = document.querySelector("#state-updates-counter");
  const stateDiffModeStatus = document.querySelector("#state-diff-mode");
  const stateToggleFoldingButton = document.querySelector(
    "#btn-state-toggle-folding",
  );
  const stateToggleDiffModeButton = document.querySelector(
    "#btn-state-toggle-diff-mode",
  );

  actionsInputFilter?.addEventListener("change", function (ev: any) {
    if (ev.target.value != null) {
      state.actionsFilterByValue = ev.target.value;
      console.log("filter::actionsFilterByValue:", state.actionsFilterByValue);
    }
  });

  stateInputFilter?.addEventListener("change", function (ev: any) {
    if (ev.target.value != null) {
      state.stateFilterByValue = ev.target.value;
      console.log("filter::stateFilterByValue:", state.stateFilterByValue);
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

  ws.onopen = function open() {
    ws.send("tail");
    if (wsReadyStateEl != null) {
      wsReadyStateEl.textContent = "connected";
    }
  };

  function recreateWebSocket(log?: (message: string) => void) {
    if (ws.readyState === WS_READY_STATE.Open) {
      return undefined;
    }

    if (ws.readyState === WS_READY_STATE.Closed) {
      log?.(
        "[rgsh-debugger/ui] Lost connection to debugger. Sleeping 3s before reconnecting...",
      );
    }
    // Give it a grace period of 3s before reconnecting
    setTimeout(() => {
      if (ws.readyState !== WS_READY_STATE.Open) {
        ws = new WebSocket(wsUri);
      }
    }, 1000 * 3);

    return undefined;
  }

  ws.onerror = function error(ev) {
    if (wsReadyStateEl != null) {
      wsReadyStateEl.textContent = "errored, error: " + (ev as any).message;
      recreateWebSocket((message) => {
        wsReadyStateEl.textContent = message;
      });
    } else {
      recreateWebSocket();
    }
  };

  ws.onclose = function close({ code, reason }) {
    const tags = [`code=${code || "none"}`, `reason=${reason || "none"}`];

    if (wsReadyStateEl != null) {
      wsReadyStateEl.textContent = `connection closed. ${tags.join(" ")}`;
      recreateWebSocket((message) => {
        wsReadyStateEl.textContent = message;
      });
    } else {
      recreateWebSocket();
    }
  };

  ws.onmessage = function message(ev) {
    const data = ev.data.toString();
    const packet = JSON.parse(data.toString()) as DebuggerPacket;

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

    let logEntry;
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

      logEntry = makeLogEntry(diffPacket);
      nodeToUpdate = stateLog;
    } else {
      logEntry = makeLogEntry(packet);
      nodeToUpdate = packet._k === "action" ? actionsLog : stateLog;
    }

    if (nodeToUpdate != null) {
      nodeToUpdate.appendChild(logEntry);
      nodeToUpdate.scrollTop = nodeToUpdate.scrollHeight;
    }

    if (actionsDispatchCounter != null) {
      actionsDispatchCounter.textContent = `(${stats.dispatchedActions} dispatches)`;
    }

    if (stateUpdatesCounter != null) {
      stateUpdatesCounter.textContent = `(${stats.stateUpdates} updates)`;
    }

    state.lastStateData = packet._d;
  };
})();
