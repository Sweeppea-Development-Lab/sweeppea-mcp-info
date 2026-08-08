# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is (and is not)

This is the **public info / distribution manifest** for the Sweeppea MCP Server — not the server itself.

The real server is **remote and hosted**: `https://mcp.sweeppea.com/` (Streamable HTTP, Bearer auth, MCP protocol `2025-11-25`). Its 83 tools proxy the Sweeppea API v3 and its implementation lives in a **different repository** (`renaissance-mcp`, sibling directory `../renaissance-mcp`). Nothing you change here alters the behavior of those 83 tools.

To resync after an upstream release, read `../renaissance-mcp/CHANGELOG.md` and `package.json` for the version and counts, then diff the tool names instead of trusting the changelog prose:

```bash
grep -oE '^#### [a-z_]+' ../renaissance-mcp/README.md | sed 's/#### //' | sort -u > /tmp/up.txt
grep -oE '^\| `[a-z_]+`' README.md | tr -d '|` ' | sort -u > /tmp/here.txt
comm -23 /tmp/up.txt /tmp/here.txt   # new upstream, missing here
comm -13 /tmp/up.txt /tmp/here.txt   # here but gone upstream — must be removed
```

The authoritative count is `find ../renaissance-mcp/src/tools -name '*Tool.js' | wc -l` **minus one** (`BaseSweeppeaTool.js` is not a tool).

What this repo actually ships:

- `README.md` — the public catalog: tool tables, per-platform setup guides, protocol table, badges. This is the primary deliverable and what most changes touch.
- `index.js` — a tiny **stdio wrapper** exposing a single local tool, `sweeppea_connect`, that just returns the remote endpoint + config JSON for a given client platform. It exists so registries (Glama, the official MCP registry) and `docker run` have something executable to list; it never calls the Sweeppea API.
- `server.json` — manifest for the official MCP registry (`mcp-publisher`). Untracked in git.
- `glama.json`, `Dockerfile` — registry/container metadata for `index.js`.

Consequence: "add a tool" here means *documenting* a tool that already exists upstream, never implementing one.

## Commands

```bash
npm install          # only dep: @modelcontextprotocol/sdk
npm start            # runs the stdio wrapper (node index.js)
docker build -t sweeppea-mcp .
```

There is no test suite, linter, or build step. To smoke-test the wrapper, drive it over stdio:

```bash
printf '%s\n' \
  '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-06-18","capabilities":{},"clientInfo":{"name":"probe","version":"1"}}}' \
  '{"jsonrpc":"2.0","method":"notifications/initialized"}' \
  '{"jsonrpc":"2.0","id":2,"method":"tools/list","params":{}}' \
  | node index.js
```

### Known defect in `index.js`

The `platform` argument is passed to `server.tool()` as a raw JSON-Schema-ish object instead of a Zod raw shape. Verified consequences:

- With SDK `1.26.0`: the server starts, but the object is parsed as **tool annotations** — `tools/list` reports `inputSchema: {"type":"object","properties":{}}`, so `platform` is invisible to clients and always falls back to `generic`.
- With SDK `1.30.0` (what `^1.26.0` resolves to on a fresh install): startup **throws** `Tool sweeppea_connect expected a Zod schema or ToolAnnotations`.

Fix by importing `zod` and declaring `{ platform: z.enum([...]).optional() }` before touching anything else in `index.js`.

## Version / count sync (mandatory before any commit)

Version and tool count are duplicated across files with no single source. A release that updates one and not the others has shipped before. Update **all** of these in the same commit:

| File | What to update |
|---|---|
| `package.json` | `version`, and the tool count in `description` |
| `index.js` | `new McpServer({ version })`, the tool count inside the `sweeppea_connect` **description string**, and the `"83 tools across 18 categories:"` + category list in the returned text |
| `README.md` | `Server-v1.X.Y` and `Tools-NN` badges, the `## Available Tools (NN)` heading, every `### Category (N)` count, and the tool table rows |
| `server.json` | `version` and `description` tool count |

`Dockerfile`, `glama.json` and `LICENSE` carry no version.

Then run the grep gate with the *previous* values and fix anything it returns:

```bash
OLD_VER=1.18.0; OLD_COUNT=83
grep -rnE "v?${OLD_VER}|${OLD_COUNT} tools" \
  --include='*.md' --include='*.json' --include='*.js' \
  --exclude-dir=node_modules --exclude-dir=.git .
```

Category counts in the README must sum to the headline number, and the category list in `index.js` must match the README's `###` sections (currently 18).

`server.json` is untracked, so it silently misses releases — it sat at `1.14.0` / `63 tools` for four versions. Check it explicitly on every bump.

## Release flow

Commits go on a branch (`feat/…`, `fix/…`, `docs/…`), never straight to `main`. After the push, always cut the GitHub release — the repo tracks versions as tags (`v1.15.3`, `v1.17.0`) plus a `gh release`:

```bash
git tag v1.X.Y && git push origin v1.X.Y
gh release create v1.X.Y --title "v1.X.Y — <short summary>" --notes "..."
```

## Never invent tools or behavior

Every tool name, description, parameter and count in `README.md` must come from the upstream `renaissance-mcp` source or from a live response of `https://mcp.sweeppea.com/`. This is a public, customer-facing catalog. Commit `97ed27d` ("remove invented Winners tools") is what happens otherwise. If you cannot verify a tool exists, leave it out and say so.

The same applies to the "Server-side Validations" section: only document guardrails and `error_code` values that exist upstream.

## Secrets

`.mcpregistry_github_token` and `.mcpregistry_registry_token` (written by `mcp-publisher login`) sit in the repo root and are **not covered by `.gitignore`**. Never `git add -A` here — stage files explicitly, or add them to `.gitignore` first.
