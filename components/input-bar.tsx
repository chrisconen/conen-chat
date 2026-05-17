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

        <p className="text-center text-[11px] leading-snug text-foreground/60">
          A beszélgetést a Conen Digital naplózza a szolgáltatás fejlesztéséhez.{" "}
          <a
            href="https://conendigital.hu/adatvedelem"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 text-foreground/80 hover:text-[var(--color-cyan)] transition-colors"
          >
            Adatvédelmi tájékoztató »
          </a>
        </p>
      </div>
    </div>
  )
}
