---
description: List your norc cron jobs, optionally filtered by machine
argument-hint: "[machine-id]"
---

Call the `list_jobs` tool on the `norc` MCP server. If `$ARGUMENTS` is non-empty, pass it as `machine_id`. Show the result as a table: id, name, schedule, command, enabled.
