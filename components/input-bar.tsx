"use client"

import { useState, type KeyboardEvent } from "react"

type Variant = "bottom" | "center"

export function InputBar({
  onSend,
  disabled,
  variant = "bottom",
}: {
  onSend: (text: string) => void
  disabled: boolean
  variant?: Variant
}) {
  const [text, setText] = useState("")

  const isEmpty = text.trim().length === 0
  const isDisabled = disabled === true || isEmpty

  function handleSubmit() {
    if (isDisabled) return
    onSend(text)
    setText("")
  }

  function onKey(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const isCenter = variant === "center"

  return (
    <div
      className={
        isCenter
          ? "relative z-10 w-full"
          : "relative z-10 border-t border-[var(--color-border)] bg-[var(--color-bg)]/95 px-5 py-6 backdrop-blur"
      }
    >
      <div className="mx-auto w-full max-w-2xl space-y-4">
        <div className="flex items-stretch gap-3">
          <div className="rotating-border flex-1 rounded-2xl p-[2px]">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={onKey}
              rows={isCenter ? 2 : 1}
              placeholder="Írj egy üzenetet…"
              disabled={disabled}
              autoFocus={isCenter}
              className="
                block w-full resize-none rounded-[14px]
                bg-[var(--color-surface)] px-4 py-3 text-[14px] leading-relaxed
                text-foreground placeholder:text-[var(--color-fg-faint)]
                outline-none transition-colors
                focus:ring-0
                disabled:opacity-50
              "
            />
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isDisabled}
            aria-label="Küldés"
            className="
              relative shrink-0 self-stretch rounded-xl bg-[var(--color-cyan)] px-5
              text-[12px] font-bold uppercase tracking-[0.18em] text-[var(--color-bg)]
              transition-all
              hover:shadow-[0_0_28px_-2px_rgba(0,240,255,0.9)]
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-cyan)]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]
              disabled:cursor-not-allowed disabled:bg-[var(--color-surface-2)] disabled:text-[var(--color-fg-faint)] disabled:shadow-none
            "
          >
            Küld
          </button>
        </div>

        <div className="flex items-center justify-center gap-4 text-[12px] text-[var(--color-fg-dim)]">
          <span className="flex items-center gap-1.5">
            <kbd className="inline-flex h-5 min-w-5 items-center justify-center rounded-md border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-1.5 font-mono text-[10px] text-foreground">
              ⏎
            </kbd>
            küld
          </span>
          <span className="text-[var(--color-fg-faint)]">·</span>
          <span className="flex items-center gap-1.5">
            <kbd className="inline-flex h-5 min-w-5 items-center justify-center rounded-md border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-1.5 font-mono text-[10px] text-foreground">
              ⇧
            </kbd>
            <kbd className="inline-flex h-5 min-w-5 items-center justify-center rounded-md border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-1.5 font-mono text-[10px] text-foreground">
              ⏎
            </kbd>
            új sor
          </span>
        </div>
      </div>
    </div>
  )
}
