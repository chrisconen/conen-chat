"use client"

import { useEffect, useRef } from "react"
import type { UIMessage } from "ai"

function textOf(message: UIMessage): string {
  return message.parts
    .filter((p): p is { type: "text"; text: string } & typeof p =>
      p.type === "text" && typeof (p as { text?: unknown }).text === "string",
    )
    .map((p) => p.text)
    .join("")
}

export function MessageList({
  messages,
  loading,
  error,
}: {
  messages: UIMessage[]
  loading: boolean
  error?: string
}) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  return (
    <div className="relative z-10 flex-1 overflow-y-auto px-5 py-4">
      <div className="mx-auto max-w-2xl space-y-3">
        {messages.map((m) => {
          const content = textOf(m)
          if (!content) return null
          const isUser = m.role === "user"
          return (
            <div key={m.id} className={isUser ? "flex justify-end" : "flex justify-start"}>
              <div
                className={
                  isUser
                    ? "max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-sm bg-[var(--color-user-bg)] px-4 py-2 text-[14px] leading-relaxed text-[var(--color-user-fg)]"
                    : "max-w-[88%] whitespace-pre-wrap rounded-2xl rounded-bl-sm border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-[14px] leading-relaxed text-foreground"
                }
              >
                {content}
              </div>
            </div>
          )
        })}
        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl rounded-bl-sm border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3">
              <div className="flex gap-1">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-cyan)] [animation-delay:-0.3s]" />
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-cyan)] [animation-delay:-0.15s]" />
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-cyan)]" />
              </div>
            </div>
          </div>
        )}
        {error && (
          <div className="flex justify-start">
            <div className="rounded-xl border border-[var(--color-error-bg)] bg-[var(--color-error-bg)] px-4 py-2 text-xs text-[var(--color-error-fg)]">
              Hiba: {error}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  )
}
