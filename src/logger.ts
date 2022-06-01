import {
  FluxBaseState,
  FluxStandardAction,
  Logger,
  LoggerType,
} from "@ethicdevs/react-global-state-hooks";
import JsonDecycle from "json-decycle";

import { WS_READY_STATE } from "./types";
import { makeWsClient } from "./ws-client";

function logActionType(action: FluxStandardAction): [string, number, string] {
  return ["action", Date.now(), JSON.stringify(action, JsonDecycle.decycle())];
}

function logStateType(state: FluxBaseState): [string, number, string] {
  return ["state", Date.now(), JSON.stringify(state, JsonDecycle.decycle())];
}

export function makeGetDebuggerLogger(options?: { wsUri?: string }): [
  (loggerType: LoggerType) => Logger<FluxBaseState>, // getLogger
  () => void, // cleanupFn
] {
  let wsClient = makeWsClient(options?.wsUri);

  function getDebuggerLogger(loggerType: LoggerType): Logger<FluxBaseState> {
    switch (loggerType) {
      case LoggerType.Dispatch: {
        return {
          logAction(action) {
            if (wsClient != null) {
              wsClient.send(logActionType(action));
            }
          },
        };
      }
      case LoggerType.State: {
        return {
          logState(state) {
            if (wsClient != null) {
              wsClient.send(logStateType(state));
            }
          },
        };
      }
    }
  }

  function cleanupDebuggerLogger() {
    if (wsClient != null && wsClient.readyState <= WS_READY_STATE.Open) {
      wsClient.stop();
      wsClient = null as never; // so it get's garbage collected
    }
  }

  return [getDebuggerLogger, cleanupDebuggerLogger];
}
