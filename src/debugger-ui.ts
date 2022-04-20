declare var document : any;

type DebuggerPacket = {
  _k: string;
  _t: number;
  _d: Record<string, unknown>
};

function makeLogEntry(packet: DebuggerPacket) {
  const date = new Date(packet._t).toLocaleString();
  const content = JSON.stringify(packet._d, null, 2);
  const str = `[${date}]: ${content}`;
  const [firstLine, ...otherLines] = str.split('\n');

  const node = document.createElement('li');
  const detailsNode = document.createElement('details');
  const summaryNode = document.createElement('summary');
  const preNode = document.createElement('pre');
  const summaryTextNode = document.createTextNode(firstLine);
  const textNode = document.createTextNode(otherLines.join('\n'));

  detailsNode.setAttribute('open', true);

  summaryNode.appendChild(summaryTextNode);
  preNode.appendChild(textNode);
  detailsNode.appendChild(summaryNode);
  detailsNode.appendChild(preNode);
  node.appendChild(detailsNode);

  return node;
}

(function iife() {
  console.log('Hey from the debugger UI!');
  const ws = new WebSocket('ws://localhost:8080');

  const wsReadyStateEl = document.querySelector('#ws-ready-state');
  const actionsLog = document.querySelector('#actions-dispatch');
  const stateLog = document.querySelector('#state-updates');

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
    } else if (packet._k === 'state') {
      nodeToUpdate = stateLog;
    }

    if (nodeToUpdate != null) {
      nodeToUpdate.appendChild(logEntry);
      nodeToUpdate.scrollTop = nodeToUpdate.scrollHeight;
    }
  };
})();
