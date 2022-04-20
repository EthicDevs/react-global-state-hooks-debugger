import {
  FluxBaseState,
  FluxStandardAction,
  Logger,
  LoggerType,
} from "@ethicdevs/react-global-state-hooks";

function makeWsClient() {
  const wsUri = "ws://10.0.2.2:8080";

  let ws = new WebSocket(wsUri);
  ws.onopen = function open() {
    ws.send("attach");
  };

  /*ws.on("message", function message(data: unknown) {
    console.log("received: %s", data);
  });*/

  return {
    send: async (packet: [string, number, string]): Promise<void> => {
      ws.send(`{"_k":"${packet[0]}","_t":${packet[1]},"_d":${packet[2]}}`)
    },
  };
}

function logActionType(action: FluxStandardAction): [string, number, string] {
  return ["action", Date.now(), JSON.stringify(action)];
}

function logStateType(state: FluxBaseState): [string, number, string] {
  return ["state", Date.now(), JSON.stringify(state)];
}

let wsClient = makeWsClient();

export function getDebuggerLogger(
  loggerType: LoggerType,
): Logger<FluxBaseState> {
  switch (loggerType) {
    case LoggerType.Dispatch: {
      return {
        logAction(action) {
          wsClient.send(logActionType(action));
        },
      };
    }
    case LoggerType.State: {
      return {
        logState(state) {
          wsClient.send(logStateType(state));
        },
      };
    }
  }
};

