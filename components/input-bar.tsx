"use client"

import { useState, type KeyboardEvent } from "react"

export function InputBar({
  onSend,
  disabled,
}: {
  onSend: (text: string) => void
  disabled: boolean
}) {
  const [text, setText] = useState("")

  function handleSubmit() {
    if (!text.trim() || disabled) return
    onSend(text)
    setText("")
  }

  function onKey(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="border-t border-foreground/10 px-6 py-4">
      <div className="mx-auto flex max-w-2xl items-end gap-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={onKey}
          rows={1}
          placeholder="Írj egy üzenetet…"
          disabled={disabled}
          className="flex-1 resize-none rounded-xl border border-foreground/15 bg-background px-4 py-2 text-sm outline-none focus:border-foreground/40 disabled:opacity-50"
        />
        <button
          type="button"
          onClick={handleSubmit}
          disabled={disabled || !text.trim()}
          className="rounded-xl bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-30"
        >
          Küldés
        </button>
      </div>
    </div>
  )
}
