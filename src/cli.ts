import { createServer } from "http";
import { promisify } from "util";
import { readFile } from "fs";
import { resolve, join } from "path";

import { WebSocketServer } from "ws";
import { v4 as uuid } from "uuid";

const readFileAsync = promisify(readFile);

const INDEX_FILE_PATH = resolve(join(__dirname, "..", "public", "index.html"));
const DEBUGGER_UI_SCRIPT_PATH = resolve(
  join(__dirname, "..", "public", "debugger-ui.js"),
);

type SocketClient = WebSocket & {
  uid?: string;
  kind?: "app" | "debugger-ui";
};

export async function cli() {
  const wss = new WebSocketServer({ port: 8080 }, () => {
    console.log("[RGSH-Debugger] WSS server listening on ws://localhost:8080");
  });

  const clients: Record<string, SocketClient> = {};

  wss.on("connection", function connection(ws) {
    const client = ws as SocketClient;
    const uid = uuid();
    client.uid = uid;

    clients[client.uid] = client;

    console.log(`[${uid}] client connected`);

    ws.on("close", function close() {
      clients[uid] = null as never; // so it get's garbage collected
      delete clients[uid];

      console.log(`[${uid}] client disconnected`);
    });

    ws.on("message", function message(data) {
      try {
        if (data.toString() === "attach") {
          client.kind = "app";
          console.log(`[${uid}] client kind set to: app`);
        } else if (data.toString() === "tail") {
          client.kind = "debugger-ui";
          console.log(`[${uid}] client kind set to: debugger-ui`);
        } else {
          console.log(`[${uid}] client sent us logs, processing...`);

          // Broadcast logs to debugger-ui's
          const attachedDebuggers = Object.values(clients).filter(
            (sockClient) => {
              return !!(
                sockClient.kind === "debugger-ui" &&
                sockClient.uid !== client.uid
              );
            },
          );

          console.log(
            `[${uid}] will emit logs to ${attachedDebuggers.length} attached debuggers...`,
          );

          attachedDebuggers.forEach((sockClient) => {
            if (sockClient && "send" in sockClient) {
              sockClient.send(data.toString());
            }
          });

          console.log(
            `[${uid}] emited logs to ${attachedDebuggers.length} attached debuggers`,
          );
        }
      } catch (err) {
        console.warn(`[${uid}] could not send message:`, err);
        // drop
      }
    });
  });

  const server = createServer(async (req, res) => {
    const method = req.method;
    const path = req.url;

    if (method === "GET") {
      switch (path) {
        case "/": {
          const indexFile = await readFileAsync(INDEX_FILE_PATH);
          res.writeHead(200, "OK", { "Content-Type": "text/html" });
          res.write(`<!--
 | @author EthicDevs <ethicdevs.com>
 | @name React Global State Hooks Debugger UI
 | @license MIT
 | @repository https://github.com/ethicdevs/react-global-state-hook-debugger
 | @see https://github.com/ethicdevs/react-global-state-hook
 -->
`);
          res.write(indexFile);
          res.end();
          break;
        }
        case "/rgsh-debugger-ui.js": {
          const debuggerUiScript = await readFileAsync(DEBUGGER_UI_SCRIPT_PATH);
          res.writeHead(200, "OK", { "Content-Type": "text/javascript" });
          res.write(`/**
 * @author EthicDevs <ethicdevs.com>
 * @name React Global State Hooks Debugger UI
 * @license MIT
 * @repository https://github.com/ethicdevs/react-global-state-hook-debugger
 * @see https://github.com/ethicdevs/react-global-state-hook
 */
`);
          res.write(debuggerUiScript);
          res.end();
          break;
        }
        default: {
          res.end("Not found.");
          break;
        }
      }
    } else {
      res.end("");
    }
  });

  server.listen(7979, "0.0.0.0", undefined, () => {
    console.log(
      "[RGSH-Debugger] HTTP server listening on http://localhost:7979",
    );
  });
}
