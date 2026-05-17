# Conen Chat

Public AI chatbot for [conen.digital](https://conen.digital). Floating widget embeddable on the static HTML site.

## Quick start

```bash
bun install                                    # if not already done by create-next-app
bun add @anthropic-ai/sdk                      # not yet installed — see AGENTS.md
echo 'ANTHROPIC_API_KEY=sk-ant-...' > .env.local
bun dev
```

- Host page: http://localhost:3000
- Chat panel: http://localhost:3000/widget

## Current state

This is a **Phase 1 scaffold**. The chat UI is wired up end-to-end, but `app/api/chat/route.ts` returns a placeholder response — the Anthropic Claude integration is intentionally not wired yet (deferred to confirm scope first). See [AGENTS.md](./AGENTS.md) for wire-up steps.

## Embedding on conen.digital

Add a single line to the host HTML site:

```html
<script src="https://chat.conen.digital/widget.js" defer></script>
```

The script lazy-mounts a floating chat button on every page and loads the iframe on first click.

## Editing what the bot knows

The bot's knowledge base lives in plain Markdown files under [`content/`](./content):

- `about.md` — who Conen Digital is
- `services.md` — what's offered
- `case-studies.md` — proof of work
- `pricing.md` — brackets and engagement formats

Edit these files, restart `bun dev`, and the bot's responses will reflect the changes. No code changes needed.

## Structure

```
conen-chat/
├── app/
│   ├── api/chat/route.ts   ← POST endpoint (currently placeholder)
│   ├── widget/page.tsx     ← chat panel (iframe target)
│   ├── page.tsx            ← host landing
│   ├── layout.tsx          ← root layout
│   └── globals.css         ← Tailwind v4 + tokens
├── components/             ← chat UI (client components)
├── content/                ← system prompt source (Markdown)
├── lib/                    ← types, system-prompt builder
├── public/widget.js        ← bootloader for embedding
├── AGENTS.md               ← project guide for AI agents
├── DESIGN.md               ← design decisions (Phase 1 + roadmap)
└── README.md
```

## Roadmap

Four phases — see [AGENTS.md](./AGENTS.md) for details:

1. **MVP** *(now)* — Anthropic streaming, basic UI, content-driven prompt.
2. **Lead capture + memory** — Supabase, anonymous session memory, lead notification.
3. **Demo booking + capability demo** — Cal.com integration, project brief generator.
4. **Analytics + polish** — PostHog, prompt-cache tuning, A/B prompts.
