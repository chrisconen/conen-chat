"use client"

import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { MessageList } from "./message-list"
import { InputBar } from "./input-bar"
import { WelcomeHero } from "./welcome-hero"

export function ChatPanel() {
  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  })

  const loading = status === "submitted" || status === "streaming"
  const isEmpty = messages.length === 0 && !loading && !error

  function send(text: string) {
    if (!text.trim() || loading) return
    sendMessage({ text })
  }

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-background">
      <div className="scanlines" aria-hidden="true" />

      {/* Brand header */}
      <header className="relative z-10 flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-surface)]/60 px-5 py-3 backdrop-blur">
        <div className="flex items-center gap-2.5">
          <span
            className="nexus-dot h-2 w-2 rounded-full bg-[var(--color-cyan)] shadow-[0_0_12px_var(--color-cyan)]"
            aria-hidden="true"
          />
          <div className="flex flex-col leading-tight">
            <span className="text-[15px] font-semibold tracking-tight">NEXUS AI</span>
            <span className="micro-label">Conen Digital</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="micro-label">{loading ? "thinking…" : "online"}</span>
          <button
            type="button"
            onClick={() => window.parent.postMessage({ type: "close-chat" }, "*")}
            aria-label="Bezárás"
            className="inline-flex items-center justify-center rounded-lg px-2 py-1 text-[18px] leading-none text-[var(--color-fg-dim)] transition-colors hover:bg-[var(--color-surface-2)] hover:text-[var(--color-cyan)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-cyan)]"
          >
            ✕
          </button>
        </div>
      </header>

      {isEmpty ? (
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-10">
          <WelcomeHero onPick={send} disabled={loading} />
          <div className="mt-10 w-full max-w-xl px-2">
            <InputBar onSend={send} disabled={loading} variant="center" />
          </div>
        </div>
      ) : (
        <>
          <MessageList messages={messages} loading={loading} error={error?.message} />
          <InputBar onSend={send} disabled={loading} variant="bottom" />
        </>
      )}
    </div>
  )
}
