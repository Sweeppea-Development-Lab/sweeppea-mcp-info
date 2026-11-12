# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is (and is not)

This is the **public information** about the Sweeppea MCP Server — not the server itself. Its only job is to stay current with upstream.

The real server is **remote and hosted**: `https://mcp.sweeppea.com/` (Streamable HTTP, Bearer auth, MCP protocol `2025-11-25`). Its 116 tools proxy the Sweeppea API v3 and its implementation lives in a **different repository** (`renaissance-mcp`, sibling directory `../renaissance-mcp`). Nothing you change here alters the behavior of those 116 tools.

To resync after an upstream release, read the version and the CHANGELOG entry from `origin/main` of `../renaissance-mcp` (the local checkout may sit on another branch), then diff the tool names instead of trusting the changelog prose:

```bash
git -C ../renaissance-mcp fetch -q origin
git -C ../renaissance-mcp show origin/main:README.md | grep -oE '^#### [a-z_]+' | sed 's/#### //' | sort -u > /tmp/up.txt
grep -oE '^\| `[a-z_]+`' README.md | tr -d '|` ' | sort -u > /tmp/here.txt
comm -23 /tmp/up.txt /tmp/here.txt   # new upstream, missing here
comm -13 /tmp/up.txt /tmp/here.txt   # here but gone upstream — must be removed
```

The authoritative count is the number of `*Tool.js` files under `src/tools/` **minus one** (`BaseSweeppeaTool.js` is not a tool). Categories are the directories under `src/tools/sweeppea/` plus `core/` (Testing).

What this repo ships: `README.md` (the public catalog: tool tables, module notes, server-side validations, per-platform setup guides, badges), `LICENSE`, and `.mcp.json` (a sample client config with a placeholder key).

Consequence: "add a tool" here means *documenting* a tool that already exists upstream, never implementing one.

There used to be a stdio wrapper (`index.js`), a `Dockerfile`, `glama.json` and `server.json` for Glama and the official MCP registry. They were removed on 2026-11-11: distribution is no longer a goal. Do not bring them back unless asked.

## Version / count sync (mandatory before any commit)

Everything lives in `README.md`. On every upstream release, update:

- the `Server-v1.X.Y` and `Tools-NN` badges
- the `## Available Tools (NN)` heading
- every `### Category Tools (N)` count, and the tool table rows
- the module notes and the "Server-side Validations" section when upstream changed them

Category counts must sum to the headline number. Then grep for the previous version; outside release history it must return nothing:

```bash
OLD_VER=1.23.2
grep -nE "v?${OLD_VER}" README.md
```

## Release flow

Commits go on a branch (`feat/…`, `fix/…`, `docs/…`), never straight to `main`. After the merge, tag and cut a GitHub release, so the public history shows what changed in each MCP version:

```bash
git tag v1.X.Y && git push origin v1.X.Y
gh release create v1.X.Y --title "v1.X.Y — <short summary>" --notes "..."
```

## Never invent tools or behavior

Every tool name, description, parameter and count in `README.md` must come from the upstream `renaissance-mcp` source or from a live response of `https://mcp.sweeppea.com/`. This is a public, customer-facing catalog. Commit `97ed27d` ("remove invented Winners tools") is what happens otherwise. If you cannot verify a tool exists, leave it out and say so.

The same applies to the "Server-side Validations" section: only document guardrails and `error_code` values that exist upstream.
