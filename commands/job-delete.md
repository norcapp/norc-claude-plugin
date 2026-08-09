---
description: Delete a norc cron job
argument-hint: "<job-id>"
---

Call the `delete_job` tool on the `norc` MCP server with `{ id: "$ARGUMENTS" }`. This is irreversible — if the id looks wrong or `$ARGUMENTS` is empty, ask for confirmation before calling the tool rather than guessing.
