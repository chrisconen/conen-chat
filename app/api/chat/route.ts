import { convertToModelMessages, streamText, type UIMessage } from "ai"
import { resolveModel } from "@/lib/llm"
import { buildSystemPrompt } from "@/lib/system-prompt"

export const runtime = "nodejs"
export const maxDuration = 60

export async function POST(req: Request) {
  let messages: UIMessage[] = []
  try {
    const body = (await req.json()) as { messages?: UIMessage[] }
    messages = body.messages ?? []
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    })
  }

  try {
    const { model } = resolveModel()
    const modelMessages = await convertToModelMessages(messages)
    const result = streamText({
      model,
      system: buildSystemPrompt(),
      messages: modelMessages,
    })
    return result.toUIMessageStreamResponse()
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown server error"
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { "content-type": "application/json" },
    })
  }
}
