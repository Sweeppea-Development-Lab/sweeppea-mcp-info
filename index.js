#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const REMOTE_URL = "https://mcp.sweeppea.com/";

const server = new McpServer({
  name: "sweeppea-mcp",
  version: "1.14.4",
});

server.tool(
  "sweeppea_connect",
  "Returns connection details and configuration instructions for the Sweeppea MCP Server. This remote server provides 66 tools across 15 categories for managing legally compliant sweepstakes promotions in the United States and Canada. Use this tool to obtain the endpoint URL, required authentication headers, and platform-specific setup guides for Claude Desktop, Cursor, Windsurf, and other MCP clients. Requires an active Sweeppea subscription and API key from sweeppea.com.",
  {
    platform: {
      type: "string",
      description: "Target MCP client platform for configuration instructions. Supported: claude-desktop, claude-code, cursor, windsurf, generic.",
      enum: ["claude-desktop", "claude-code", "cursor", "windsurf", "generic"],
    },
  },
  async ({ platform = "generic" }) => {
    const configs = {
      "claude-desktop": {
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
      "claude-code": {
        command: 'claude mcp add sweeppea ' + REMOTE_URL + ' --header "Authorization: Bearer YOUR_API_KEY" --header "MCP-Protocol-Version: 2025-11-25"',
      },
      cursor: {
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
      windsurf: {
        mcpServers: {
          sweeppea: {
            serverUrl: REMOTE_URL,
            headers: {
              Authorization: "Bearer <YOUR_API_KEY>",
              "MCP-Protocol-Version": "2025-11-25",
            },
          },
        },
      },
      generic: {
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
    };

    return {
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
            "Configuration for " + platform + ":",
            JSON.stringify(configs[platform] || configs.generic, null, 2),
          ].join("\n"),
        },
      ],
    };
  },
);

const transport = new StdioServerTransport();
await server.connect(transport);
