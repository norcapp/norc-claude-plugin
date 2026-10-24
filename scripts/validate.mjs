#!/usr/bin/env node
// Validates .claude-plugin/{plugin,marketplace}.json and commands/*.md frontmatter.
// ponytail: hand-rolled frontmatter parser (flat key: value / string-array only) —
// swap for a real YAML parser if commands need nested frontmatter.
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = new URL('..', import.meta.url).pathname
let errors = []

function fail(msg) {
  errors.push(msg)
}

function loadJson(path) {
  try {
    return JSON.parse(readFileSync(join(ROOT, path), 'utf8'))
  } catch (e) {
    fail(`${path}: invalid JSON — ${e.message}`)
    return null
  }
}

// --- plugin.json ---
const plugin = loadJson('.claude-plugin/plugin.json')
if (plugin) {
  for (const key of ['name', 'version', 'description']) {
    if (!plugin[key]) fail(`plugin.json: missing required field "${key}"`)
  }
  const pin = (plugin.mcpServers?.norc?.args ?? []).find((a) => /^norc-mcp@/.test(a))
  if (!pin || !/^norc-mcp@\d+\.\d+\.\d+$/.test(pin)) fail('plugin.json: norc-mcp must be pinned to an exact version')
  if (plugin.mcpServers?.norc?.type === 'http' && !plugin.mcpServers.norc.url) {
    fail('plugin.json: mcpServers.norc is type "http" but has no "url"')
  }
}

// --- marketplace.json ---
const marketplace = loadJson('.claude-plugin/marketplace.json')
if (marketplace) {
  for (const key of ['name', 'owner', 'plugins']) {
    if (!marketplace[key]) fail(`marketplace.json: missing required field "${key}"`)
  }
  if (!marketplace.owner?.name) fail('marketplace.json: owner.name is required')
  for (const [i, p] of (marketplace.plugins ?? []).entries()) {
    if (!p.name) fail(`marketplace.json: plugins[${i}] missing "name"`)
    if (!p.source) fail(`marketplace.json: plugins[${i}] missing "source"`)
  }
}

// --- commands/*.md frontmatter ---
const ALLOWED_COMMAND_KEYS = new Set([
  'description',
  'argument-hint',
  'allowed-tools',
  'model',
  'disable-model-invocation',
])
const commandsDir = join(ROOT, 'commands')
for (const file of readdirSync(commandsDir)) {
  if (!file.endsWith('.md')) continue
  const text = readFileSync(join(commandsDir, file), 'utf8')
  const match = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) {
    fail(`commands/${file}: missing --- frontmatter block`)
    continue
  }
  const [, fm, body] = match
  if (!fm.includes('description:')) fail(`commands/${file}: frontmatter missing "description"`)
  if (!body.includes('$ARGUMENTS') && /argument-hint:/.test(fm)) {
    fail(`commands/${file}: has argument-hint but body never references $ARGUMENTS`)
  }
  for (const line of fm.split('\n')) {
    const key = line.split(':')[0]?.trim()
    if (key && !ALLOWED_COMMAND_KEYS.has(key)) {
      fail(`commands/${file}: unrecognized frontmatter key "${key}"`)
    }
  }
}

if (errors.length) {
  console.error(`${errors.length} problem(s) found:\n`)
  errors.forEach((e) => console.error(`  - ${e}`))
  process.exit(1)
}
console.log('norc-plugin: all config valid.')
