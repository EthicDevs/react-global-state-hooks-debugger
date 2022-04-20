declare var document : any;
declare var alert : (message: string) => void;

type DebuggerPacket = {
  _k: string;
  _t: number;
  _d: Record<string, unknown>
};

function makeLogEntry(packet: DebuggerPacket) {
  const date = new Date(packet._t).toLocaleString();
  const packetType = packet._d?.type;
  const maybeActionType = packetType == null ? '' : `${packetType} => `;
  const content = JSON.stringify(packet._d, null, 2);
  const str = `[${date}]: ${maybeActionType}${content}`;
  const [firstLine, ...otherLines] = str.split('\n');

  const node = document.createElement('li');
  const detailsNode = document.createElement('details');
  const summaryNode = document.createElement('summary');
  const preNode = document.createElement('pre');
  const summaryTextNode = document.createTextNode(firstLine);
  const textNode = document.createTextNode(otherLines.join('\n'));

  detailsNode.setAttribute('open', true);
  detailsNode.classList.add('log');
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
}

(function iife() {
  console.log('Hey from the debugger UI!');
  const ws = new WebSocket('ws://localhost:8080');

  let stats = {
    dispatchedActions: 0,
    stateUpdates: 0,
  }

  let state = {
    actionsAllFolded: false,
    stateAllFolded: false,
  };

  const wsReadyStateEl = document.querySelector('#ws-ready-state');
  const actionsLog = document.querySelector('#actions-dispatch');
  const actionsDispatchCounter = document.querySelector('#dispatched-actions-counter');
  const actionsToggleFoldingButton = document.querySelector('#btn-action-toggle-folding');

  const stateLog = document.querySelector('#state-updates');
  const stateUpdatesCounter = document.querySelector('#state-updates-counter');
  const stateToggleFoldingButton = document.querySelector('#btn-state-toggle-folding');

  actionsToggleFoldingButton.addEventListener('click', () => {
    const allActionNodes = document.querySelectorAll('.log-action');
    allActionNodes.forEach(makeNodeToggleFolding(state.actionsAllFolded));
    state.actionsAllFolded = !state.actionsAllFolded;
  });

  stateToggleFoldingButton.addEventListener('click', () => {
    const allStateNodes = document.querySelectorAll('.log-state');
    allStateNodes.forEach(makeNodeToggleFolding(state.stateAllFolded));
    state.stateAllFolded = !state.stateAllFolded;
  });

  ws.onopen = function open() {
    ws.send('tail');
    wsReadyStateEl.textContent = 'connected';
  };

  ws.onerror = function error(ev) {
    wsReadyStateEl.textContent = 'errored, error: ' + ev.message;
  };

  ws.onclose = function close({code, reason, message}) {
    const tags = [
      `code=${code || 'none'}`,
      `reason=${reason || 'none'}`,
      `message=${message || 'none'}`,
    ];

    wsReadyStateEl.textContent = `connection closed. ${tags.join(' ')}`;
  }

  ws.onmessage = function message(ev) {
    const data = ev.data.toString();
    const packet = JSON.parse(data.toString()) as DebuggerPacket;

    const logEntry = makeLogEntry(packet);

    let nodeToUpdate;
    if (packet._k === 'action') {
      nodeToUpdate = actionsLog;
      stats.dispatchedActions += 1;
    } else if (packet._k === 'state') {
      nodeToUpdate = stateLog;
      stats.stateUpdates += 1;
    }

    if (nodeToUpdate != null) {
      nodeToUpdate.appendChild(logEntry);
      nodeToUpdate.scrollTop = nodeToUpdate.scrollHeight;
    }

    actionsDispatchCounter.textContent = `(${stats.dispatchedActions} dispatches)`;
    stateUpdatesCounter.textContent = `(${stats.stateUpdates} updates)`;
  };
})();
