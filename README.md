# norc Claude Code plugin

Slash commands for managing your [norc](https://norc.app) cron jobs, machines, and run history from Claude Code, backed by the [norc-mcp](https://github.com/norcapp/norc-mcp) server.

## Setup

1. Install this plugin (Claude Code 2.1.275 or later):
   ```
   /plugin install norc --marketplace norcapp/norc-claude-plugin
   ```
   On older versions: `claude plugin marketplace add norcapp/norc-claude-plugin`, then `claude plugin install norc`.
2. When Claude Code asks for the norc API key, paste one (starts with `norc_sk_`). Create it in the norc vault under Settings, API Keys, Generate key. Claude Code stores it in your system credential store.

Needs Node 20+. No Docker or separate server to run.

## What the plugin runs and sends

- It starts one local MCP server, `npx -y norc-mcp@0.3.0` (the open-source [norc-mcp](https://github.com/norcapp/norc-mcp) package, pinned to an exact version), over stdio.
- The server sends your norc API key and each tool request (list, create, update or delete jobs and machines, read run history) to `https://vault.norc.app`, norc's own API, and nowhere else. It stores nothing and has no database of its own.
- The plugin has no hooks, no scripts and no background processes.
- Privacy policy: https://norc.app/privacy. Terms: https://norc.app/terms. Support: https://norc.app/support.

Using Claude Desktop instead? Plugins are Claude Code only. See the [norc-mcp README](https://github.com/norcapp/norc-mcp#claude-desktop) to add the MCP server to `claude_desktop_config.json`.

## Commands

| Command | MCP tool | Does |
|---|---|---|
| `/norc:jobs [machine-id]` | `list_jobs` | List cron jobs |
| `/norc:job-create <machine-id> <name> <schedule> <command>` | `create_job` | Create a job |
| `/norc:job-update <job-id> <field>=<value> ...` | `update_job` | Edit a job |
| `/norc:job-delete <job-id>` | `delete_job` | Delete a job |
| `/norc:machines` | `list_machines` | List paired machines |
| `/norc:machine-rename <machine-id> <new-name>` | `rename_machine` | Rename a machine |
| `/norc:machine-delete <machine-id>` | `delete_machine` | Unpair a machine |
| `/norc:runs [job-id] [machine-id] [status]` | `list_runs` | View run history |

Pairing new machines isn't exposed via MCP (device-code flow lives in the norc CLI/desktop app) — no `/norc:pair` command.
