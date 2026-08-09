---
description: List norc job run history, optionally filtered by job, machine, or status
argument-hint: "[job-id] [machine-id] [status]"
---

Parse `$ARGUMENTS` for any of: a job id, a machine id, a status (`success`|`warning`|`failed`|`running`|`disabled`). Call the `list_runs` tool on the `norc` MCP server with whichever of `job_id`/`machine_id`/`status` were given. Show the result as a table: run id, job, machine, status, started, duration. Mention if more pages are available via `cursor`.
