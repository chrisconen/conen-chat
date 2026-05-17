# Conen Chat — Design System

Phase 1 uses Tailwind defaults with the `--background` / `--foreground` token pair. The full Conen Digital visual identity will be layered in during Phase 3 (polish).

## Universal craft

The agent's design quality bar lives in the global opencode design system at `~/.config/opencode/DESIGN.md` — Part 2 (Universal Designer Craft). Apply those principles here: spacing scale, typographic mastery, color craft, visual hierarchy, optical adjustments, anti-patterns, the quality checklist.

## Project-specific decisions to make (Phase 3)

- **Type scale** — modular ratio (proposed: 1.25, major third)
- **Color tokens** — Conen Digital brand palette in OKLCH (not hex). Need: surface scale (3 steps), ink scale (3 steps), brand accent, secondary accent, status colors.
- **Font pairing** — Conen brand fonts. Proposed: one serif display + one geometric sans body. Reasoned font pairing rules apply (see global DESIGN.md §2).
- **Component primitives** — likely shadcn/ui later; for the MVP scaffold the components are plain Tailwind.
- **Chat bubble style** — currently rounded-2xl, foreground/background contrast. Phase 3 may move to a more branded look (subtle gradient, custom border-radius, distinct sender styling).

## Current rendering decisions (MVP)

- **Container**: `mx-auto max-w-2xl` for the message column (≈672px → roughly 65ch body width, in target range from §2).
- **Bubble**: `rounded-2xl px-4 py-2 text-sm`. User: `bg-foreground text-background`. Assistant: `bg-foreground/5`.
- **Input**: `rounded-xl border border-foreground/15`. Focus: `focus:border-foreground/40` (subtle).
- **FAB widget button** (in `public/widget.js`): 60×60 circular, `#171717` bg, position bottom-right, `2147483646` z-index so it stays above most site content but below the iframe wrap (`2147483647`).
- **Mobile**: widget iframe goes full-screen below 500px (see `widget.js` media query). Touch targets meet the 44×44 minimum.

## Accessibility — already in place

- FAB has `aria-label="Open AI assistant"` and toggles `aria-expanded`.
- Iframe has a `title` attribute.
- Focus ring on FAB via `focus-visible:outline`.
- Send button disables on empty input and during loading.

## Accessibility — still owed

- `prefers-reduced-motion` respect (FAB hover transform; chat scroll behavior).
- Keyboard-only flow: Enter sends, Shift+Enter newline. Currently implemented.
- Screen reader announce for new assistant messages (`aria-live="polite"`).
- Better focus management when the chat opens (focus the textarea).
