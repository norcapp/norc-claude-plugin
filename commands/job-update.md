---
description: Update an existing norc cron job (name, schedule, command, or enabled state)
argument-hint: "<job-id> <field>=<value> ..."
---

Parse `$ARGUMENTS`: first token is the job id, remaining tokens are `field=value` pairs for any of `name`, `schedule`, `command`, `enabled`. Call the `update_job` tool on the `norc` MCP server with `{ id, ...patch }`, only including fields the user actually specified. Show the updated job on success.
