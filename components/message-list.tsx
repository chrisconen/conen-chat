"use client"

import { useEffect, useRef } from "react"
import type { Message } from "@/lib/types"

export function MessageList({ messages, loading }: { messages: Message[]; loading: boolean }) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  if (messages.length === 0 && !loading) {
    return (
      <div className="flex flex-1 items-center justify-center px-6 py-8">
        <div className="mx-auto max-w-md space-y-2 text-center">
          <p className="text-lg font-medium">Helló, Conen Digital AI vagyok.</p>
          <p className="text-sm opacity-70">
            Kérdezz nyugodtan a szolgáltatásainkról, projektekről, vagy mondd el milyen
            projektet tervezel.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto px-6 py-4">
      <div className="mx-auto max-w-2xl space-y-4">
        {messages.map((m) => (
          <div key={m.id} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
            <div
              className={
                m.role === "user"
                  ? "max-w-[85%] whitespace-pre-wrap rounded-2xl bg-foreground px-4 py-2 text-sm text-background"
                  : "max-w-[85%] whitespace-pre-wrap rounded-2xl bg-foreground/5 px-4 py-2 text-sm"
              }
            >
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl bg-foreground/5 px-4 py-2 text-sm opacity-60">…</div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  )
}
