export function WelcomeHero() {
  return (
    <div className="mx-auto max-w-md space-y-4 text-center">
      <div className="micro-label text-[var(--color-cyan)]">SYSTEM // BOOT OK</div>
      <p className="text-balance text-2xl font-semibold leading-tight tracking-tight">
        Helló, <span className="text-[var(--color-cyan)]">NEXUS AI</span> vagyok, a Conen DIGITAL fejlesztése.
      </p>
      <p className="text-sm leading-relaxed text-[var(--color-fg-dim)]">
        Kérdezz nyugodtan a szolgáltatásainkról, projektekről, vagy mondd el milyen
        projektet tervezel.
      </p>
      <div className="flex flex-wrap justify-center gap-2 pt-2 text-[11px]">
        {["Astro 5 weboldal", "Headless webshop", "AX-audit", "n8n automatizáció"].map((t) => (
          <span
            key={t}
            className="rounded-full border border-[var(--color-border-strong)] bg-[var(--color-surface)]/60 px-3 py-1 text-[var(--color-fg-dim)]"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}
