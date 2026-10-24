---
description: Unpair (archive) a norc machine
argument-hint: "<machine-id>"
---

If `$ARGUMENTS` is empty, ask for the machine id. Otherwise find the machine with `list_machines` and show the user its name and hostname. Ask them to confirm unpairing that specific machine and wait for an explicit yes. Its jobs are archived with it.

Then call the `delete_machine` tool on the `norc` MCP server with `{ id: "$ARGUMENTS", name: <the machine's exact name>, confirm: true }`. The owner can undo this in the Norc app for about 10 minutes; after that it is removed permanently.
