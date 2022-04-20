import { ProtocolPacket, ProtocolPacketKind, serializePacket } from "./protocol";
import { WsClient, WS_READY_STATE } from "./types";

export function makeWsClient(wsUri = "ws://10.0.2.2:8080"): WsClient {
  const sendRetryQueue: string[] = [];

  let ws = new WebSocket(wsUri);

  ws.onopen = function open() {
    ws.send(ProtocolPacketKind.Attach);
    if (sendRetryQueue.length <= 0) {
      sendRetryQueue.forEach((packetStr) => ws.send(packetStr));
    }
  };

  return {
    readyState: ws.readyState,
    async send(packet: ProtocolPacket): Promise<void> {
      const packetStr = serializePacket(packet);
      if (ws.readyState === WS_READY_STATE.Open) {
        ws.send(packetStr);
      } else {
        sendRetryQueue.push(packetStr);
      }
    },
    async stop(reason: string): Promise<void> {
      if (ws.readyState <= WS_READY_STATE.Open) {
        ws.send(ProtocolPacketKind.Dettach);
        ws.close(0, reason);
      }
    }
  };
}
