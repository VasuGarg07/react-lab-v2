# React Lab

A pnpm workspace monorepo of independent React mini-applications — each app builds and deploys on its own, while sharing a common UI, auth, and utility layer through local workspace packages.

---

## Applications

- 🧩 **Formlyst** — A visual builder for structured, multi-step forms. Drag fields and sections around, configure validation rules, then publish — anyone with the share link gets the form rendered at runtime from the stored config. Responses come back to a dashboard with a per-submission detail view.

- 💼 **Jobscape** — A two-sided job board. Register as an applicant or an employer: applicants build a profile, browse and search jobs and companies, apply with an optional cover letter, save roles, and track applications; employers set up a company, post and manage jobs (edit, archive, delete), and review applicants with resumes and cover letters.

- ⚔️ **Pokeverse** — A full Pokémon experience built on top of PokéAPI. Browse a virtualized Pokédex, drill into rich detail pages (stats, evolutions, moves, sprites, varieties), then assemble a team and run turn-based battles in a multi-screen flow — setup → team selection → loading → battle.

- ❌⭕ **Super Tic-Tac-Toe** — Tic-tac-toe with a strategic twist. Play on a 3×3 grid of boards where your move dictates which board your opponent must play on next. Local two-player, with a guided start popup and live instructions.

- ✍️ **Blogify** — A blogging platform with first-class Notebooks — curated collections of blogs published together as a unit. Rich text editing via Tiptap, image uploads, an author-discovery feed, a personal library, and shareable detail pages.

- 💸 **BudgetBuddy** — A personal expense tracker with three views: home for quick entry, overview for the running ledger, and statistics for charted breakdowns. Filters, categories, and Recharts visualizations.

- 📊 **Sorting Visualizer** — Watch sorting algorithms run frame-by-frame. Pick an algorithm, scrub the speed, and read the algorithm-info panel for complexity and behavior. Live statistics track comparisons and swaps as the bars animate.

- 🃏 **Poke-Memory** — A Pokémon-themed memory matching game. Configure grid size and difficulty, flip cards, match pairs, and get a results screen at the end.

- 🏦 **Loan Wizard** — An EMI calculator that flips into an affordability check. Enter loan inputs and see amortization broken down visually, or work backward from your income to see what you can actually afford.

- 🌳 **JSON Visualizer** — Paste, upload, or fetch JSON and explore it as a collapsible tree; breadcrumb navigation tracks where you are deep in the structure.

- 📝 **Markdown Live** — A two-pane Markdown editor with live preview, syntax highlighting, dark mode, and clipboard integration. GFM via `marked`, styled previews via Tailwind typography.

- 🔢 **Sudoku** — Generated puzzles with conflict highlighting, peer-cell guides, keyboard navigation, and an animated backtracking solver.

- ❓ **Quizzo** — A quiz engine with a setup → play → result flow. Configure topic and length, answer timed questions, get a scored breakdown at the end.

- 🍳 **Recipe Haven** — A recipe browser on top of TheMealDB. Search by name, browse by category, alphabet, or area, then drill into a meal detail page with ingredients and step-by-step instructions.

---

## Tech Stack

| | |
|---|---|
| Framework | React 19 + TypeScript |
| Build Tool | Vite 8 |
| Monorepo | pnpm workspaces + Turborepo |
| Routing | React Router 7 |
| Styling | Tailwind CSS 4 |
| State | Redux Toolkit (global) + TanStack Query (server) |
| Forms | React Hook Form + Yup |
| Editor | Tiptap |
| DnD | dnd-kit |
| Charts | Recharts |
| Auth | JWT (access + refresh) via `axios` interceptors |
| Image Hosting | ImgBB |
| Deployment | Firebase Hosting (one site per app) |

---

## Structure

```
react-lab/
├── apps/
│   ├── showcase/          # hub/landing page — links to all apps
│   ├── blogify/
│   ├── budget-buddy/
│   ├── formlyst/
│   ├── invoice-gen/
│   ├── jobscape/
│   ├── json-live/
│   ├── loan-wizard/
│   ├── markdown-live/
│   ├── poke-memory/
│   ├── pokeverse/
│   ├── quizzo/
│   ├── recipe-haven/
│   ├── sorting-visualizer/
│   ├── sudoku/
│   └── super-tic-tac-toe/
├── packages/
│   ├── ui/                # shared component primitives, ThemeProvider, Layout
│   ├── shared/            # API client, query client, utilities
│   └── auth/              # JWT auth flows, interceptors, auth components
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

Each app is a fully independent Vite + React project with its own `package.json`, `vite.config.ts`, and `tsconfig.json`. Apps consume shared packages directly from source via workspace references — no build step needed for packages. Adding a new app means scaffolding a new folder under `apps/` and registering it; nothing else in the monorepo needs to change.

---

## Getting Started

```bash
# Install all dependencies
pnpm install

# Copy and fill in environment variables
# .env — development values (localhost URLs, API keys)
# apps/showcase/.env.development — per-app localhost dev URLs
# apps/showcase/.env.production — per-app production URLs

# Start all apps in parallel
pnpm dev

# Start a single app
pnpm dev:showcase
pnpm dev:blogify
# etc.
```

---

## Building & Deploying

```bash
# Build all apps (Turborepo, cached)
pnpm build

# Build a single app
pnpm build:blogify

# Deploy a single app (build + firebase deploy)
pnpm deploy:blogify

# Deploy everything
pnpm deploy:all
```

Each app deploys to its own Firebase Hosting site. Targets are defined in `firebase.json` and `.firebaserc`.

---

*This is a living playground — apps get rewritten, new ones get added, and the shared infrastructure evolves alongside them.*