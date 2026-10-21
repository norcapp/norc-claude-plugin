# norc Claude Code plugin

Slash commands for managing your [norc](https://norc.app) cron jobs, machines, and run history from Claude Code, backed by the [norc-mcp](https://github.com/norcapp/norc-mcp) server.

## Setup

1. Set your norc API key (starts with `norc_sk_`, from norc.app settings):
   ```
   export NORC_API_KEY=norc_sk_...
   ```
2. Install this plugin:
   ```
   claude plugin marketplace add norcapp/norc-claude-plugin
   claude plugin install norc
   ```

Claude Code starts the MCP server itself (`npx -y norc-mcp`, stdio). Needs Node 20+; no Docker or separate server to run.

> Verify `${NORC_API_KEY}` env-var interpolation in `.claude-plugin/plugin.json` against the current Claude Code MCP config docs — syntax may differ by version.

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
