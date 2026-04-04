#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const REMOTE_URL = "https://mcp.sweeppea.com/";

const server = new McpServer({
  name: "sweeppea-mcp",
  version: "1.14.2",
});

server.tool(
  "sweeppea_connect",
  "Returns connection details for the Sweeppea MCP Server (66 tools for legally compliant sweepstakes management in the US and Canada). Requires a Sweeppea subscription and API key from sweeppea.com.",
  {},
  async () => ({
    content: [
      {
        type: "text",
        text: [
          "Sweeppea MCP Server — Sweepstakes Management Platform",
          "",
          "Remote endpoint: " + REMOTE_URL,
          "Transport:       Streamable HTTP",
          "Auth:            Bearer <SWEEPPEA_API_KEY>",
          "Protocol:        MCP 2025-11-25",
          "",
          "66 tools across 15 categories:",
          "Account, Sweepstakes, Participants, Entry Page, Groups,",
          "Notes, Calendar, Rules, Billing, Support, Winners,",
          "Documentation, Utilities, To-Do, Testing",
          "",
          "Get your API key: https://www.sweeppea.com/",
          "Documentation:    https://mcpdocs.sweeppea.com/",
          "",
          "Claude Code config:",
          JSON.stringify(
            {
              mcpServers: {
                sweeppea: {
                  url: REMOTE_URL,
                  headers: {
                    Authorization: "Bearer <YOUR_API_KEY>",
                    "MCP-Protocol-Version": "2025-11-25",
                  },
                },
              },
            },
            null,
            2,
          ),
        ].join("\n"),
      },
    ],
  }),
);

const transport = new StdioServerTransport();
await server.connect(transport);
