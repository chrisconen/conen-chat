"use client"

import { useState } from "react"
import type { Message } from "@/lib/types"
import { MessageList } from "./message-list"
import { InputBar } from "./input-bar"

export function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)

  async function send(text: string) {
    if (!text.trim() || loading) return
    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
      ts: new Date().toISOString(),
    }
    const next = [...messages, userMsg]
    setMessages(next)
    setLoading(true)
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: next }),
      })
      const data = (await res.json()) as { role: "assistant"; content: string; ts: string }
      setMessages([
        ...next,
        { id: crypto.randomUUID(), role: data.role, content: data.content, ts: data.ts },
      ])
    } catch {
      setMessages([
        ...next,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "A kérés most nem ment át. Próbáld újra egy pillanat múlva.",
          ts: new Date().toISOString(),
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-full flex-col">
      <MessageList messages={messages} loading={loading} />
      <InputBar onSend={send} disabled={loading} />
    </div>
  )
}
