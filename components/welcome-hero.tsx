const SUGGESTIONS: ReadonlyArray<{ chip: string; prompt: string }> = [
  { chip: "Mennyibe kerül egy weboldal?", prompt: "Mennyibe kerül egy weboldal? Mit takarnak a havi bérelhető és az egyedi projekt árazási sávok?" },
  { chip: "Mit jelent az AX-audit?", prompt: "Mit jelent pontosan az AX-audit, és kinek éri meg?" },
  { chip: "Felújítjátok a WordPress oldalam?", prompt: "Van egy régi WordPress oldalam. Hogy néz ki nálatok egy migráció + EAA-megfelelés?" },
  { chip: "Hogyan segíthet egy AI-asszisztens?", prompt: "Hogyan tudna egy AI-asszisztens (mint te) segíteni a saját cégemnek?" },
]

export function WelcomeHero({ onPick, disabled = false }: { onPick?: (text: string) => void; disabled?: boolean }) {
  return (
    <div className="mx-auto max-w-md space-y-4 text-center">
      <div className="micro-label text-[var(--color-cyan)]">SYSTEM // BOOT OK</div>
      <p className="text-balance text-2xl font-semibold leading-tight tracking-tight">
        Helló, <span className="text-[var(--color-cyan)]">NEXUS AI</span> vagyok, a Conen Digital asszisztense.
      </p>
      <p className="text-sm leading-relaxed text-[var(--color-fg-dim)]">
        Kérdezz az árazásról, szolgáltatásokról vagy technológiákról, mondd el milyen projektet
        tervezel — komoly érdeklődéseket ingyenes discovery callra irányítlak.
      </p>
      <div className="flex flex-wrap justify-center gap-2 pt-2 text-[11px]">
        {SUGGESTIONS.map(({ chip, prompt }) => (
          <button
            key={chip}
            type="button"
            onClick={() => onPick?.(prompt)}
            disabled={disabled || !onPick}
            className="
              rounded-full border border-[var(--color-border-strong)] bg-[var(--color-surface)]/60
              px-3 py-1 text-[var(--color-fg-dim)]
              transition-colors
              hover:border-[var(--color-cyan)] hover:bg-[var(--color-surface)] hover:text-foreground
              focus-visible:outline-none focus-visible:border-[var(--color-cyan)] focus-visible:ring-1 focus-visible:ring-[var(--color-cyan)]/40
              disabled:cursor-not-allowed disabled:opacity-50
            "
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  )
}
