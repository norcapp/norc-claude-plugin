# norc Claude Code plugin

Slash commands for managing your [norc](https://norc.app) cron jobs, machines, and run history from Claude Code, backed by the [norc-mcp](https://github.com/norcapp/norc-mcp) server.

## Setup

1. Install this plugin (Claude Code 2.1.275 or later):
   ```
   /plugin install norc --marketplace norcapp/norc-claude-plugin
   ```
   On older versions: `claude plugin marketplace add norcapp/norc-claude-plugin`, then `claude plugin install norc`.
2. When Claude Code asks for the norc API key, paste one (starts with `norc_sk_`). Create it in the norc vault under Settings, API Keys, Generate key. Claude Code stores it in your system credential store.

Prefer a **read-only** key unless you want Claude to change jobs; read-only keys can list but not write. Needs Node 20+. No Docker or separate server to run.

## What the plugin runs and sends

- It starts one local MCP server, `npx -y norc-mcp@0.3.0` (the open-source [norc-mcp](https://github.com/norcapp/norc-mcp) package, pinned to an exact version), over stdio.
- The server sends your norc API key and each tool request (list, create, update or delete jobs and machines, read run history) to `https://vault.norc.app`, norc's own API, and nowhere else. It stores nothing and has no database of its own.
- Jobs created or changed through the plugin are **pending** until the account owner approves them in the Norc app (vault, desktop or mobile). They do not run before that. Create, update and delete commands show you the exact command text and machine and ask for your confirmation before calling the tool.
- Deleting a job or machine archives it; the owner can undo that in the app for about 10 minutes.
- The plugin has no hooks, no scripts and no background processes.
- Privacy policy: https://norc.app/privacy. Terms: https://norc.app/terms. Support: https://norc.app/support.

Using Claude Desktop instead? Plugins are Claude Code only. See the [norc-mcp README](https://github.com/norcapp/norc-mcp#claude-desktop) to add the MCP server to `claude_desktop_config.json`.

## Commands

| Command | MCP tool | Does |
|---|---|---|
| `/norc:jobs [machine-id]` | `list_jobs` | List cron jobs (long commands truncated) |
| `/norc:job-create <machine-id> <name> <schedule> <command>` | `create_job` | Create a job (pending until approved in the app) |
| `/norc:job-update <job-id> <field>=<value> ...` | `get_job`, `update_job` | Edit a job (command or schedule changes need approval again) |
| `/norc:job-delete <job-id>` | `get_job`, `delete_job` | Archive a job (about 10 minute undo) |
| `/norc:machines` | `list_machines` | List paired machines |
| `/norc:machine-rename <machine-id> <new-name>` | `rename_machine` | Rename a machine |
| `/norc:machine-delete <machine-id>` | `delete_machine` | Unpair (archive) a machine (about 10 minute undo) |
| `/norc:runs [job-id] [machine-id] [status]` | `list_runs` | View run history |

The MCP server also exposes `sync_jobs` (declarative sync of the full job set: a dry run returns a diff and a short-lived confirmation token, and applying needs that token), which Claude can call directly; there is no slash command for it. In total the server has 10 tools: the 8 above plus `get_job` and `sync_jobs`.

Pairing new machines isn't exposed via MCP (device-code flow lives in the norc CLI/desktop app) — no `/norc:pair` command.
