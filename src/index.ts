#!/usr/bin/env node
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createServer } from "./server.js";
import { killAll } from "./processes.js";

const server = createServer();
await server.connect(new StdioServerTransport());

const shutdown = () => {
  killAll();
  process.exit(0);
};
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
// stdout es el canal MCP: los mensajes para humanos van a stderr.
console.error("tortolero-commander listo (stdio)");
