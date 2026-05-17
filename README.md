# Conen Chat

Public AI chatbot for [conen.digital](https://conen.digital). Floating widget embeddable on the static HTML site.

## Quick start

```bash
bun install
cp .env.example .env.local        # then edit .env.local with your real keys
bun dev
```

- Host page: http://localhost:3000
- Chat panel: http://localhost:3000/widget

By default the bot uses `openai:gpt-4o-mini`. To switch:

```env
# .env.local
MODEL=anthropic:claude-sonnet-4-6
ANTHROPIC_API_KEY=sk-ant-...
```

Supported providers (operator-side, no visitor selector):

**Paid:**
- `openai:gpt-4o-mini`, `openai:gpt-4.1`, `openai:gpt-4o`
- `anthropic:claude-sonnet-4-6`, `anthropic:claude-haiku-4-5`
- `google:gemini-2.5-flash`, `google:gemini-2.5-pro`
- `deepseek:deepseek-chat`, `deepseek:deepseek-reasoner`

**Free tier (Groq — daily free credits + generous limits):**
- `groq:llama-3.3-70b-versatile` (best quality on free tier)
- `groq:llama-3.1-8b-instant` (fastest, lower quality)
- `groq:mixtral-8x7b-32768`

Get a free Groq API key at [console.groq.com](https://console.groq.com).

## Current state

**Phase 1 — done.** Streaming chat via Vercel AI SDK v6 with 4-provider support (OpenAI, Anthropic, Google, DeepSeek). Active model selected via `MODEL` env var. Content-driven system prompt — edit `content/*.md` to teach the bot.

Next phases (Supabase memory, lead capture, demo booking, polish) are still ahead — see [AGENTS.md](./AGENTS.md).

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
