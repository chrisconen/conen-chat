import { convertToModelMessages, streamText, type UIMessage } from "ai"
import { randomUUID } from "node:crypto"
import { resolveModel } from "@/lib/llm"
import { buildSystemPrompt } from "@/lib/system-prompt"

export const runtime = "nodejs"
export const maxDuration = 60

const MAX_LOG_CHARS = 2000

function truncate(s: string, n: number): string {
  return s.length > n ? s.slice(0, n) + "...[truncated]" : s
}

function extractText(parts: UIMessage["parts"]): string {
  return parts.map((p) => (p.type === "text" ? p.text : "")).join("")
}

export async function POST(req: Request) {
  const reqId = randomUUID().slice(0, 8)

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

  const lastUser = messages.findLast((m) => m.role === "user")
  const userText = lastUser ? extractText(lastUser.parts) : ""

  try {
    const { model, provider, modelId } = resolveModel()

    console.log(
      JSON.stringify({
        type: "chat_request",
        req_id: reqId,
        ts: new Date().toISOString(),
        model: `${provider}:${modelId}`,
        msg_count: messages.length,
        user_msg: truncate(userText, MAX_LOG_CHARS),
      }),
    )

    const modelMessages = await convertToModelMessages(messages)
    const result = streamText({
      model,
      system: buildSystemPrompt(),
      messages: modelMessages,
      onFinish: ({ text, finishReason, totalUsage }) => {
        console.log(
          JSON.stringify({
            type: "chat_response",
            req_id: reqId,
            ts: new Date().toISOString(),
            model: `${provider}:${modelId}`,
            finish_reason: finishReason,
            tokens_in: totalUsage?.inputTokens,
            tokens_out: totalUsage?.outputTokens,
            bot_msg: truncate(text, MAX_LOG_CHARS),
          }),
        )
      },
    })
    return result.toUIMessageStreamResponse()
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown server error"
    console.log(
      JSON.stringify({
        type: "chat_error",
        req_id: reqId,
        ts: new Date().toISOString(),
        error: msg,
      }),
    )
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { "content-type": "application/json" },
    })
  }
}
