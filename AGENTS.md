<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Conen Chat — Project Guide

Public AI chatbot for conen.digital. Embedded on the static HTML site via `/widget.js`.

# Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 (`@theme inline` in `app/globals.css`)
- **Vercel AI SDK v6** (`ai`, `@ai-sdk/react`) — unified streaming + `useChat` hook
- **5 LLM providers** via `@ai-sdk/openai`, `@ai-sdk/anthropic`, `@ai-sdk/google`, `@ai-sdk/deepseek`, `@ai-sdk/groq` (Groq = free-tier path)
- Bun package manager
- Supabase Postgres (Phase 2 — not yet wired)
- Vercel hosting (planned)

# Model selection

The active model is **chosen by the operator** (no visitor-facing dropdown), via the `MODEL` environment variable.

Format: `<provider>:<model-id>` — e.g. `openai:gpt-4o-mini`, `anthropic:claude-sonnet-4-6`, `deepseek:deepseek-chat`.

Default: `openai:gpt-4o-mini` (cheap, ~$0.15/$0.60 per Mtoken).

To switch models:
1. Edit `MODEL` in `.env.local` (dev) or in Vercel project settings (prod).
2. Ensure the API key for that provider is set (`OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, `GOOGLE_GENERATIVE_AI_API_KEY`, or `DEEPSEEK_API_KEY`).
3. Restart `bun dev` (or redeploy on Vercel — env changes don't hot-reload).

The resolver in `lib/llm.ts` passes the model ID **verbatim** to the provider SDK — so new model names work as soon as the provider releases them; no code change needed.

# Layout

- `app/page.tsx` — host landing (developer-facing, not the chat)
- `app/widget/page.tsx` — the chat panel page, loaded into the iframe on the host site
- `app/api/chat/route.ts` — POST endpoint. Uses `streamText` from `ai` and `resolveModel()` from `lib/llm.ts`.
- `components/` — chat UI (chat-panel uses `useChat` from `@ai-sdk/react`; message-list renders `UIMessage.parts`)
- `content/` — Markdown source files for the system prompt. Edit these to teach the bot about Conen Digital — never hardcode info in TS.
- `lib/llm.ts` — env-driven provider resolver. Reads `MODEL` env var, returns a Vercel AI SDK `LanguageModel`.
- `lib/system-prompt.ts` — reads `content/*.md`, builds the system prompt.
- `lib/types.ts` — shared `Message`, `Role` types (legacy from pre-AI-SDK; kept for any non-streaming use).
- `public/widget.js` — bootloader script for embedding on the static HTML site.

# Commands

- `bun dev` — http://localhost:3000 (host page) and http://localhost:3000/widget (chat panel)
- `bun run build` — production build
- `bun run lint` — ESLint

# Conventions

- **System prompt content lives in Markdown files** in `content/` — operator edits Markdown, never code, when updating what the bot knows.
- **Server Components by default**; mark `"use client"` only when state, effects, or browser APIs are needed.
- All chat UI components are client (chat-panel, message-list, input-bar).
- Tailwind v4 with `@theme inline` tokens. Use `bg-foreground`, `text-background`, `bg-foreground/10` — don't hardcode hex colors.
- The chat backend (`/api/chat`) **never validates the model ID** — whatever string is in `MODEL` is passed verbatim to the SDK. This is intentional: new models from any provider work without code changes.

# Environment variables

- `MODEL` — provider:model-id, e.g. `openai:gpt-4o-mini` (required)
- `OPENAI_API_KEY` — required if `MODEL` starts with `openai:`
- `ANTHROPIC_API_KEY` — required if `MODEL` starts with `anthropic:`
- `GOOGLE_GENERATIVE_AI_API_KEY` — required if `MODEL` starts with `google:`
- `DEEPSEEK_API_KEY` — required if `MODEL` starts with `deepseek:`
- `GROQ_API_KEY` — required if `MODEL` starts with `groq:` (free tier — `groq:llama-3.3-70b-versatile` for dev/cost-zero deploys)
- Phase 2: `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- Phase 2: `RESEND_API_KEY` for lead notification emails
- Phase 2: `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` for rate limiting

# Phases

See the project memory `project-conen-chatbot-strategy` (in `~/.claude/projects/g--BOLT/memory/`) for the full roadmap.

1. **Phase 1 (current)** — Streaming chat via Vercel AI SDK v6, 4 provider support, content-driven system prompt. Basic UI, no memory, no tools.
2. **Phase 2** — Supabase memory + lead capture tool + email notifications + rate limiting.
3. **Phase 3** — Calendar booking + capability-demo tools + lead magnet.
4. **Phase 4** — Analytics + prompt-cache tuning + A/B prompts.

# Brand framing

Position the bot as **"AI assistant built on open-source"** — *NOT* "proprietary AI we developed". Marketing copy says "powered by [provider], customized by Conen Digital". This is honesty calibration — the value-add is the prompt engineering, design, and integration, not the underlying model.

# Anti-patterns to avoid

- Don't hardcode Conen-specific facts in TypeScript. Use `content/*.md`.
- Don't hardcode model IDs in TS. The env var is the source of truth.
- Don't add a visitor-facing model selector without explicit operator buy-in — public model selection enables cost runaway from bad actors picking expensive models.
- Don't expose API keys, internal hostnames, or environment-specific URLs in the bundle. Server-side only.
- Don't let the bot make pricing commitments outside the brackets in `content/pricing.md`. Route to discovery call.
