---
description: Rename a paired norc machine
argument-hint: "<machine-id> <new-name>"
---

First token in `$ARGUMENTS` is the machine id, the rest is the new name. Show the user the current and new name and wait for an explicit yes, then call the `rename_machine` tool on the `norc` MCP server with `{ id, name }`.
