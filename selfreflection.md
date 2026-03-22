# Session Self-Reflection
**Date:** 2026-03-21
**Task:** Editorial landing page redesign + scroll reveals + light mode + mobile fixes

---

## What Worked

### Design process
- **Reading everything before writing anything.** Reading all 10 component files + globals.css + site.config.ts + layout.tsx upfront meant zero surprises mid-implementation. No backtracking.
- **Committing fully to the aesthetic.** Picking editorial/magazine and not hedging produced a coherent result. Every decision (sharp radius, `border-l border-t` grid, raw type metrics, no cards) reinforced the same direction.
- **UI UX Pro Max skill** gave useful structural guidance — scroll animation rules, prefers-reduced-motion requirement, typography mood confirmation. Worth running even when the direction is already decided.
- **Build verification after every major change.** Caught the orphaned `</div>` errors immediately rather than after 10 more edits.
- **The `Reveal` component approach.** IntersectionObserver in a single 50-line wrapper, imported into each section. Clean separation — sections don't know about scroll logic, the component handles it entirely.
- **Features grid border fix.** The `border-l border-t` on container + `border-r border-b` on each cell pattern is the correct solution for bordered grids. No conditional class logic, works at any item count and any breakpoint. Worth remembering for every future grid.
- **`clamp()` for fluid type.** Single value handles all viewport sizes without breakpoint-specific overrides.

### Tooling
- **Vercel deploy** was instant and worked first try. Good to know `vercel --yes` skips the confirmation prompt.
- **Build output as the source of truth.** TypeScript passing + Turbopack compiling = font imports are valid, even when `node -e require()` says otherwise. Trust the build, not the shell check.

---

## What Did Not Work

### 21st.dev MCP
- **The tool returned `[object Object]` every time.** The MCP response is a structured JS object that gets coerced to a string when called outside Cursor/Windsurf where the IDE can consume the typed response. The tool is effectively non-functional in this CLI context for getting component code.
- **Spawning a sub-agent to call it also failed** for the same reason — the agent received the same coerced output.
- **The correct schema isn't obvious.** Required `ToolSearch` to discover that `message`, `searchQuery`, `absolutePathToCurrentFile`, `absolutePathToProjectDirectory`, and `standaloneRequestQuery` are all required. The tool silently fails with unhelpful errors if any are missing.
- **Action for next sessions:** Don't waste time trying to get component code from 21st.dev MCP in this CLI context. Use it for *search/inspiration* if it ever returns useful output, but design the components directly using the UI UX Pro Max design system output as the spec.

### Surgical edits introducing structural bugs
- **Adding `<Reveal>` wrappers via `Edit` tool caused orphaned `</div>` tags** in two files (waitlist + footer). When replacing `<div className="...">` with `<Reveal className="...">`, the original closing `</div>` stays in place and needs a separate edit to remove.
- **Action for next sessions:** When adding wrapper components that replace existing container tags, either rewrite the full file or do two explicit edits: (1) replace opening tag, (2) replace closing tag. Never assume a single Edit will handle both ends of a tag pair.

### Initial light/dark mode design
- **Both `:root` and `.dark` were identical on first pass** — the "dark editorial" was committed as default and the theme toggle did nothing. This was caught and fixed but shouldn't have shipped in the first pass.
- **Action for next sessions:** When the brief says "dark mode only as aesthetic direction", the correct interpretation is: dark mode is the primary experience, but a light editorial variant should still exist so the toggle is functional. Design both modes from the start.

### `node -e require()` for validating Next.js fonts
- **Returned `undefined` for valid fonts** including `Instrument_Sans`. Next.js font imports are build-time transforms, not runtime CommonJS exports. The check was meaningless.
- **Action for next sessions:** The only valid check for next/font availability is `npm run build`. Don't run shell checks on next/font imports.

---

## Process Observations

### What slowed things down
- Over-planning the features grid border logic before writing it. The correct pattern (`border-l border-t` / `border-r border-b`) was obvious once written — the mental planning loop added no value.
- Trying multiple approaches with the 21st.dev MCP before accepting it doesn't work in this context.

### What to do differently
- For structural wrapper additions (like `<Reveal>`), rewrite the full file instead of using surgical edits. The time saved by surgical edit is lost when the JSX parse error hits.
- Run `npm run build` more frequently — after every file, not after every batch. Build is fast (< 2s with Turbopack) and errors are cheaper to fix immediately.
- When the MCP fails, move on immediately. The design system from UI UX Pro Max + direct implementation produces the same or better result.

---

## Tooling Notes for Next Sessions

| Tool | Works in CLI | Notes |
|---|---|---|
| UI UX Pro Max skill | ✅ Yes | Run with `--design-system --persist` for saved output |
| 21st.dev `21st_magic_component_builder` | ⚠️ Partially | Schema requires 5 params; returns `[object Object]` for component code |
| 21st.dev `21st_magic_component_inspiration` | Unknown | Not tested this session |
| 21st.dev VS Code extension | ✅ Yes | Correct workflow — generate in VS Code, paste to scratch.tsx, hand off to CLI |
| Vercel CLI | ✅ Yes | `vercel --yes` for non-interactive deploy |
| next/font validation | ❌ Shell | Use `npm run build` only |
| IntersectionObserver for scroll reveals | ✅ Yes | Preferred over CSS `animation-timeline: view()` (browser support too limited) |

---

## Session 2 — 2026-03-21: 21st.dev VS Code Extension Workflow Test

### What Worked

- **21st.dev VS Code extension → scratch.tsx → CLI pipeline is functional.** The full handoff loop worked: generate in VS Code, paste to staging file, review in CLI, fix issues, preview in browser. No blockers.
- **21st.dev respected the design brief well.** When prompted with tone, constraint, and component type, it produced Libre Bodoni headings, Public Sans body, and `#EC4899` accent — matching the design system without being told the exact values. Typography rejection criteria (no Inter/Roboto) didn't need to be invoked.
- **Lucide icons came through correctly.** The extension used `Check` from `lucide-react` without prompting — consistent with our icon rules.
- **Preact + Vite as a preview sandbox works.** The existing preview folder in `21st Dev/` is a valid isolated preview environment. `@preact/preset-vite` aliases `react` → `preact/compat`, so components written with `import { useState } from 'react'` run without modification.
- **Pre-handoff checklist caught real issues.** The review step found: hardcoded hex instead of CSS vars, missing hover/focus states, and a hardcoded description string. All were corrected before integration would have happened.

### What Did Not Work

- **`index.html` was missing from the preview project.** Vite requires it as the entry point — without it the dev server serves a blank page with no error. Always verify `index.html` exists before running `npm run dev` in an unfamiliar Vite project.
- **`pkill -f vite` doesn't work on Windows.** Orphaned Node processes stack up across restarts, bumping the port each time. Use `taskkill //F //IM node.exe` to clear all Node processes before restarting. Be aware this kills all Node processes — including any unrelated ones.
- **21st.dev generated inline styles throughout.** Makes hover/focus states require `useState` + event handlers instead of simple CSS classes. On integration into the Next.js/Tailwind project, convert to Tailwind utilities to eliminate this overhead.

### Process Observations

- The value of `scratch.tsx` as a mandatory staging step is real — it forces a review pass before anything touches the codebase.
- The pre-handoff checklist in `21stDev.md` and the required fixes block in `.instructions.md` were added mid-session based on failures. They'll prevent the same issues from reaching review in future runs.
- Component took one generation attempt — no rejects. Tight upfront prompting (tone + constraint + specific elements) is worth the 30 seconds it takes.
