# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm run start    # Serve the production build (run build first)
npm run lint     # ESLint (flat config)
```

No test runner is configured. If you add one, wire it into `package.json` scripts.

## Stack & conventions

- **Next.js 16 (App Router)** — routing, layouts, and pages live in `app/`. See `@AGENTS.md`: this Next.js version has breaking changes vs. training data, so consult `node_modules/next/dist/docs/` (start with `01-app/`) before writing framework code.
- **React 19** with **TypeScript** in `strict` mode.
- **Tailwind CSS v4** — CSS-first, so there is **no `tailwind.config.js`**. Design tokens (colors, fonts) are declared in `app/globals.css` via `@import "tailwindcss"` and the `@theme inline` block. Add or change tokens there, not in a JS config. PostCSS uses the `@tailwindcss/postcss` plugin.
- **Import alias**: `@/*` maps to the repo root (e.g. `import x from "@/app/..."`).
- **Fonts**: Geist Sans/Mono loaded via `next/font/google` in `app/layout.tsx`, exposed as the `--font-sans` / `--font-mono` CSS variables.
- **Dark mode**: driven by `prefers-color-scheme` in `app/globals.css` plus Tailwind `dark:` variants.
