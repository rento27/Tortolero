#!/usr/bin/env node
import { killAll } from "./processes.js";
import { createMcpHttpServer } from "./http.js";
import { DEFAULT_TOKEN_FILE, loadOrCreateToken } from "./token.js";
import { startTunnel } from "./tunnel.js";

const args = new Set(process.argv.slice(2));
const port = Number(process.env.TORTOLERO_PORT ?? 8765);
const token = process.env.TORTOLERO_TOKEN ?? loadOrCreateToken(undefined, args.has("--rotate"));

const httpServer = createMcpHttpServer(token);
await new Promise<void>((resolve, reject) => {
  httpServer.once("error", reject);
  // Solo loopback: lo unico que lo alcanza desde fuera es el tunel.
  httpServer.listen(port, "127.0.0.1", resolve);
});

let stopTunnel = () => {};
let publicBase = `http://127.0.0.1:${port}`;
if (!args.has("--no-tunnel")) {
  try {
    const tunnel = await startTunnel(port);
    stopTunnel = tunnel.stop;
    publicBase = tunnel.url;
  } catch (err) {
    console.error(`No se pudo abrir el tunel: ${(err as Error).message}`);
    httpServer.close();
    process.exit(1);
  }
}

console.log("");
console.log("tortolero-commander (modo remoto) esta corriendo.");
console.log("");
console.log("URL para agregar como conector en Claude (es secreta, no la compartas):");
console.log(`  ${publicBase}/mcp/${token}`);
console.log("");
console.log(`Quien tenga esa URL controla archivos${process.env.TORTOLERO_DISABLE_PROCESS === "1" ? "" : " y terminal"} de esta computadora.`);
console.log(`Token guardado en ${DEFAULT_TOKEN_FILE}. Para invalidar la URL: npm run remote -- --rotate`);
console.log("Ctrl+C para cerrar el tunel. No se inicia solo al encender la Mac.");
console.log("");

const shutdown = () => {
  stopTunnel();
  killAll();
  httpServer.close();
  process.exit(0);
};
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
