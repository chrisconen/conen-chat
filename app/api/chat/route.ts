import type { NextRequest } from "next/server"
import { buildSystemPrompt } from "@/lib/system-prompt"
import type { Message } from "@/lib/types"

export const runtime = "nodejs"

export async function POST(req: NextRequest) {
  let messages: Message[] = []
  try {
    const body = (await req.json()) as { messages?: Message[] }
    messages = body.messages ?? []
  } catch {
    return new Response(JSON.stringify({ error: "invalid JSON body" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    })
  }

  const lastUser = messages.filter((m) => m.role === "user").at(-1)?.content ?? ""

  // PLACEHOLDER — replace with Anthropic SDK streaming once @anthropic-ai/sdk is installed
  // and ANTHROPIC_API_KEY is set in .env.local. See README.md for the wire-up step.
  const systemPrompt = buildSystemPrompt()
  const reply = [
    "[Placeholder — Anthropic Claude not yet wired up]",
    "",
    `I received: "${lastUser.slice(0, 200)}"`,
    "",
    `System prompt is ready (${systemPrompt.length} chars, ${CONTENT_FILES_LOADED(systemPrompt)} content sections).`,
    "",
    "Next step to enable real responses:",
    "1. bun add @anthropic-ai/sdk",
    "2. Add ANTHROPIC_API_KEY to .env.local",
    "3. Replace this stub with a streaming call to anthropic.messages.stream",
  ].join("\n")

  return new Response(
    JSON.stringify({
      role: "assistant",
      content: reply,
      ts: new Date().toISOString(),
    }),
    { headers: { "content-type": "application/json" } },
  )
}

function CONTENT_FILES_LOADED(prompt: string): number {
  return (prompt.match(/^---$/gm) ?? []).length + 1
}
