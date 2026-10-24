---
description: Update a norc cron job (name, schedule, command, or enabled state)
argument-hint: "<job-id> <field>=<value> ..."
---

Parse `$ARGUMENTS`: first token is the job id, remaining tokens are `field=value` pairs for any of `name`, `schedule`, `command`, `enabled`.

Before calling the tool, fetch the job with `get_job` and show the user the current and new values, including the exact new command text and the machine it runs on. Wait for an explicit yes. Never apply a command the user has not seen.

Then call the `update_job` tool on the `norc` MCP server with `{ id, ...patch }`, only including fields the user actually specified. Changing the command or schedule, or enabling a job, makes it pending again: it does not run until the account owner approves it in the Norc app. Say so, and do not claim the change is live.
