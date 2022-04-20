
export type ProtocolPacket = [string, number, string];

export enum ProtocolPacketKind {
  Unknown,
  Attach = 'attach',
  Dettach = 'dettach',
  Tail = 'tail',
}

export function serializePacket(packet: ProtocolPacket): string {
  return `{"_k":"${packet[0]}","_t":${packet[1]},"_d":${packet[2]}}`;
}