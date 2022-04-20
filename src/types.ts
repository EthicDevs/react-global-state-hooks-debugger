import { ProtocolPacket } from "./protocol";

export enum WS_READY_STATE {
  Connecting = 0,
  Open = 1,
  Closing = 2,
  Closed = 3,
}

export interface WsClient {
  readyState: WS_READY_STATE;
  send(packet: ProtocolPacket): Promise<void>;
  stop(reason?: string | Error): Promise<void>;
}
