```
 ___
/ __|_ __ _____ ___ _ __ _ __  ___ __ _
\__ \ V  V / -_) -_) '_ \ '_ \/ -_) _` |
|___/\_/\_/\___\___| .__/ .__/\___\__,_|
                   |_|  |_|
```

# Sweeppea MCP Server

**Model Context Protocol for Sweepstakes Management**

![MCP Protocol](https://img.shields.io/badge/MCP_Protocol-2025--11--25-blue)
![Server Version](https://img.shields.io/badge/Server-v1.14.0-green)
![Tools](https://img.shields.io/badge/Tools-63-orange)
![Transport](https://img.shields.io/badge/Transport-Streamable_HTTP-purple)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## How It Works

The Sweeppea MCP Server is a secure bridge between AI assistants and the [Sweeppea API](https://apidocs.sweeppea.com/). It translates natural language interactions into structured API calls, giving your AI assistant full access to sweepstakes management — participants, official rules, winners, calendars, billing, and more.

```
Your AI Assistant  →  MCP (Model Context Protocol)  →  Sweeppea MCP Server  →  Sweeppea API v3
```

No local setup required — just point your MCP client to the endpoint and authenticate.

---

## Authentication & Pricing

This MCP server requires a **Sweeppea API Key** tied to an active subscription.

Running sweepstakes in the United States and/or Canada is legally complex. Each state has its own regulations — registration requirements, bonding thresholds, void-where-prohibited rules, prize disclosure laws, and official rules that must comply with federal and state-level consumer protection statutes. Getting any of this wrong exposes sponsors to real legal liability.

Sweeppea handles that complexity for you and much more. The platform generates legally compliant official rules, manages multi-state eligibility, enforces entry limits, and provides an auditable record of every participant and winner draw. The API Key you use to connect isn't just authentication — it's your access to a system built specifically to keep sweepstakes legally defensible.

**To get started:**

1. Create an account at [www.sweeppea.com](https://www.sweeppea.com/)
2. Choose a plan that fits your needs
3. Get your API Key from the API dashboard
4. Connect your MCP client using the [configuration guides below](#platform-setup)

**Documentation:**

- MCP Server docs: [mcpdocs.sweeppea.com](https://mcpdocs.sweeppea.com)
- API documentation: [apidocs.sweeppea.com](https://apidocs.sweeppea.com)

---

## Quick Start

Using **Claude Code CLI**:

```bash
claude mcp add sweeppea https://mcp.sweeppea.com/ \
  --transport http \
  --header "Authorization: Bearer YOUR_API_KEY" \
  --header "MCP-Protocol-Version: 2025-11-25"
```

See [Platform Setup](#platform-setup) for Claude Desktop, Cursor, Windsurf, GitHub Copilot, Gemini CLI, and more.

---

## Available Tools (63)

### Account Tools (4)

| Tool | Description |
|------|-------------|
| `health_check` | Verify connection to Sweeppea API and validate your API key |
| `get_profile` | Get user profile information for a Sweeppea account |
| `get_business` | Get business information including company details and address |
| `get_plan` | Get subscription plan details including pricing, limits and features |

### Entry Page Tools (3)

| Tool | Description |
|------|-------------|
| `get_entry_fields` | Get all form fields for a sweepstakes entry page. Use before adding participants |
| `get_entry_settings` | Get all entry page settings: display, colors, compliance, confirmation, winners, age gate, AMOE, and more |
| `update_entry_settings` | Update 1-5 entry page settings per request. Supports 80+ configurable fields |

### Sweepstakes Tools (7)

| Tool | Description |
|------|-------------|
| `fetch_sweepstakes` | Get all sweepstakes associated with your account |
| `create_sweepstakes` | Create a new sweepstakes with type, handler, dates, and times |
| `update_sweepstakes` | Update an existing sweepstakes (name, dates, times) |
| `clone_sweepstakes` | Clone an existing sweepstakes with new parameters and dates |
| `pause_sweepstakes` | Pause a sweepstakes, setting it to inactive while preserving data |
| `unpause_sweepstakes` | Reactivate a paused sweepstakes to allow new entries |
| `delete_sweepstakes` | Permanently delete a sweepstakes and all associated data |

### Participant Tools (5)

| Tool | Description |
|------|-------------|
| `add_participant` | Add a new participant to a sweepstakes with custom fields |
| `get_participant` | Fetch a single participant by token, email, or phone number |
| `fetch_participants` | List participants with pagination (20/page), search, and date filters |
| `count_participants` | Get participant counts with optional filtering by type and date |
| `delete_participant` | Permanently remove a participant from a sweepstakes |

### Group Tools (4)

| Tool | Description |
|------|-------------|
| `fetch_groups` | Get all groups from a sweepstakes for participant segmentation |
| `create_group` | Create a new group within a sweepstakes |
| `update_group` | Update the name of an existing group in a sweepstakes |
| `delete_group` | Delete a group. Cannot delete primary, locked, or groups with participants |

### Notes Tools (5)

| Tool | Description |
|------|-------------|
| `fetch_notes` | Get all notes, decrypted and in reverse chronological order |
| `get_note` | Fetch a single note by token. Content is automatically decrypted |
| `create_note` | Create a new note. Content is encrypted using AES-256-CBC |
| `update_note` | Update an existing note. Supports partial updates |
| `delete_note` | Permanently delete a note. This action cannot be undone |

### Calendar Tools (5)

| Tool | Description |
|------|-------------|
| `fetch_calendar_events` | Get all calendar events with dates, times, and status |
| `get_calendar_event` | Get a single calendar event by its token with full details |
| `create_calendar_event` | Create a new calendar event with title, dates, and notifications |
| `update_calendar_event` | Update an existing calendar event. Cannot update to past dates |
| `delete_calendar_event` | Permanently delete a calendar event. Cannot be undone |

### Rules Tools (5)

| Tool | Description |
|------|-------------|
| `fetch_rules` | Get all official rules including primary and secondary rules |
| `create_rule` | Create a new official rules document with HTML content |
| `update_rule` | Update an existing official rules document. Supports partial updates |
| `delete_rule` | Permanently delete an official rules document. Cannot be undone |
| `create_rules_wizard` | Generate official rules via 14-step wizard. Complete HTML rules server-side |

### Billing & Wallet Tools (4)

| Tool | Description |
|------|-------------|
| `fetch_wallet_transactions` | Get all wallet transactions including credits, debits, and payments |
| `fetch_billing_transactions` | Get all billing transactions including invoices and amounts |
| `fetch_billing_consumptions` | Get monthly and yearly billing consumption totals |
| `fetch_data_transfer` | Get data transfer records for a specific sweepstakes with costs |

### Support Tickets Tools (7)

| Tool | Description |
|------|-------------|
| `fetch_open_tickets` | Get open tickets with pagination, search, platform and priority filters |
| `fetch_closed_tickets` | Get closed tickets with pagination, search, platform and priority filters |
| `get_ticket` | Get full ticket details by case number including notes and files |
| `create_ticket` | Create a new support ticket with title, description, and priority |
| `resolve_ticket` | Close/resolve an open support ticket |
| `update_ticket` | Update an open support ticket. At least one field required |
| `delete_ticket` | Permanently delete an open support ticket. Cannot be undone |

### Winners Tools (5)

| Tool | Description |
|------|-------------|
| `fetch_winners` | Get winners from a sweepstakes with pagination and search |
| `draw_winners` | Draw random winners from eligible participants |
| `schedule_drawing` | Schedule a future winner drawing for a sweepstakes |
| `fetch_scheduled_drawings` | Get all scheduled drawings for a sweepstakes |
| `delete_scheduled_drawing` | Delete a pending scheduled drawing. Only pending drawings can be deleted |

### Documentation Tools (1)

| Tool | Description |
|------|-------------|
| `fetch_documentation` | Get help and support documentation articles with pagination and search |

### Utilities Tools (5)

| Tool | Description |
|------|-------------|
| `fetch_timezones` | Get all available timezones with IANA identifiers and UTC offsets |
| `fetch_states` | Get all US states including DC, Puerto Rico, and territories |
| `fetch_zipcodes` | Search US zip codes by code, city, or state. Up to 10 results |
| `fetch_areacodes` | Search US telephone area codes by code or state. Up to 10 results |
| `fetch_countries` | Search countries by name, dial code, or ISO abbreviation. Up to 10 results |

### Testing Tools (1)

| Tool | Description |
|------|-------------|
| `hello_world` | Simple test tool to verify MCP connection is working properly |

---

## Usage Examples

**Initialize connection:**

```bash
curl -X POST https://mcp.sweeppea.com/ \
  -H "Content-Type: application/json" \
  -H "MCP-Protocol-Version: 2025-11-25" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "initialize",
    "params": {
      "protocolVersion": "2025-11-25",
      "clientInfo": {"name": "client"}
    }
  }'
```

**Add a participant:**

```bash
curl -X POST https://mcp.sweeppea.com/ \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "MCP-Session-Id: uuid-xxx" \
  -d '{
    "jsonrpc": "2.0",
    "id": 2,
    "method": "tools/call",
    "params": {
      "name": "add_participant",
      "arguments": {
        "sweepstakes_token": "xxx-xxx-xxx",
        "email": "user@example.com",
        "fields": {"First_Name": "John", "Last_Name": "Doe"}
      }
    }
  }'
```

---

## Platform Setup

### Claude Code (CLI)

```bash
claude mcp add sweeppea https://mcp.sweeppea.com/ \
  --transport http \
  --header "Authorization: Bearer YOUR_API_KEY" \
  --header "MCP-Protocol-Version: 2025-11-25"
```

### Claude Desktop / Cowork

Config file location:
- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

Requires Node.js installed.

```json
{
  "mcpServers": {
    "sweeppea": {
      "command": "npx",
      "args": [
        "-y", "mcp-remote",
        "https://mcp.sweeppea.com/",
        "--header", "Authorization: Bearer YOUR_API_KEY",
        "--header", "MCP-Protocol-Version: 2025-11-25"
      ]
    }
  }
}
```

### Cursor

`~/.cursor/mcp.json` (global) or `.cursor/mcp.json` (project)

1. Create or edit the config file with the JSON below
2. Replace `YOUR_API_KEY` with your Sweeppea API Key
3. Restart Cursor
4. Go to **Settings > Tools & MCP**
5. Enable the **sweeppea** server with the toggle switch

```json
{
  "mcpServers": {
    "sweeppea": {
      "url": "https://mcp.sweeppea.com/",
      "headers": {
        "Authorization": "Bearer YOUR_API_KEY",
        "MCP-Protocol-Version": "2025-11-25"
      }
    }
  }
}
```

### Windsurf

`~/.codeium/windsurf/mcp_config.json` (global)

1. Create or edit the config file with the JSON below
2. Replace `YOUR_API_KEY` with your Sweeppea API Key
3. Go to **Settings > Cascade > MCP Servers**
4. Verify that **sweeppea** appears and is enabled

```json
{
  "mcpServers": {
    "sweeppea": {
      "serverUrl": "https://mcp.sweeppea.com/",
      "headers": {
        "Authorization": "Bearer YOUR_API_KEY",
        "MCP-Protocol-Version": "2025-11-25"
      }
    }
  }
}
```

### GitHub Copilot (VS Code)

`.vscode/mcp.json` (workspace) or User Settings

```json
{
  "inputs": [
    {
      "type": "promptString",
      "id": "sweeppea-api-key",
      "description": "Sweeppea API Key",
      "password": true
    }
  ],
  "servers": {
    "sweeppea": {
      "type": "http",
      "url": "https://mcp.sweeppea.com/",
      "headers": {
        "Authorization": "Bearer ${input:sweeppea-api-key}",
        "MCP-Protocol-Version": "2025-11-25"
      }
    }
  }
}
```

### Gemini CLI

`~/.gemini/settings.json` (global) or `.gemini/settings.json` (project)

```json
{
  "mcpServers": {
    "sweeppea": {
      "httpUrl": "https://mcp.sweeppea.com/",
      "headers": {
        "Authorization": "Bearer YOUR_API_KEY",
        "MCP-Protocol-Version": "2025-11-25"
      }
    }
  }
}
```

### Agent Zero

Open-source AI agent framework with MCP support.

1. Go to **Settings > MCP/A2A > MCP Servers**
2. Add the JSON configuration below
3. Replace `YOUR_API_KEY` with your Sweeppea API Key
4. Click **Save**

```json
{
  "mcpServers": {
    "sweeppea": {
      "description": "Sweeppea - Sweepstakes Management API",
      "type": "streamable-http",
      "url": "https://mcp.sweeppea.com/",
      "headers": {
        "Authorization": "Bearer YOUR_API_KEY",
        "MCP-Protocol-Version": "2025-11-25"
      }
    }
  }
}
```

### Antigravity by Google

`~/.gemini/antigravity/mcp_config.json` (global)

```json
{
  "mcpServers": {
    "sweeppea": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://mcp.sweeppea.com/",
        "--header",
        "Authorization: Bearer YOUR_API_KEY",
        "--header",
        "MCP-Protocol-Version: 2025-11-25"
      ]
    }
  }
}
```

---

## Protocol

| Property | Value |
|----------|-------|
| **Version** | `2025-11-25` |
| **Transport** | Streamable HTTP |
| **Authentication** | Bearer token |
| **Format** | JSON-RPC 2.0 |
| **Endpoint** | `https://mcp.sweeppea.com/` |

---

## License

MIT License - see [LICENSE](LICENSE) file for details.

(c) Sweeppea | All rights reserved
