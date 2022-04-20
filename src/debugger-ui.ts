declare var document : any;

type DebuggerPacket = {
  _k: string;
  _t: number;
  _d: Record<string, unknown>
};

function makeLogEntry(packet: DebuggerPacket): string {
  return `[${new Date(packet._t).toLocaleString()}]: ${JSON.stringify(packet._d)}`;
}

(function iife() {
    console.log('Hey from the debugger UI!');
    const ws = new WebSocket('ws://localhost:8080');
    const actionsLog = document.querySelector('#actions-dispatch')
    const stateLog = document.querySelector('#state-updates')
    ws.onopen = function open() {
        console.log('connected');
        ws.send('tail');
    };
    ws.onmessage = function message(ev) {
        console.log('got message from ws:', ev.data);
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
          nodeToUpdate.textContent += `${logEntry}\n`;
        }
    };
})();
