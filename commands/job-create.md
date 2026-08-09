---
description: Create a new norc cron job
argument-hint: "<machine-id> <name> <schedule> <command>"
---

Parse `$ARGUMENTS` for a machine id, job name, cron schedule, and shell command. If any piece is missing or ambiguous (e.g. the user gave a plain-English description like "back up my db every night" instead of a cron expression), ask a clarifying question or translate it to a valid 5-field cron expression yourself before calling the tool — never guess a schedule silently.

Call the `create_job` tool on the `norc` MCP server with `{ machine_id, name, schedule, command, enabled }` (enabled defaults to true unless told otherwise). Show the created job on success.
