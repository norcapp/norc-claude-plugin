---
description: Delete (archive) a norc cron job
argument-hint: "<job-id>"
---

If `$ARGUMENTS` is empty, ask for the job id. Otherwise fetch the job with `get_job` and show the user its name, schedule and machine. Ask them to confirm deleting that specific job and wait for an explicit yes.

Then call the `delete_job` tool on the `norc` MCP server with `{ id: "$ARGUMENTS", name: <the job's exact name>, confirm: true }`. The job is archived and the owner can undo this in the Norc app for about 10 minutes; after that it is removed permanently.
