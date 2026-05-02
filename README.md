# Code Garage

A single React + TypeScript + Vite app that hosts thirteen independent mini-applications under one roof. Rather than scaffolding a fresh project for every experiment, everything lives in one codebase — with centralized auth, shared UI primitives, and a unified router — while each app stays cleanly isolated in its own folder.

The backend lives in a sibling repo: [`express-ts`](https://github.com/VasuGarg07/express-ts).

---

## Applications

- 🧩 **Formlyst** — A visual builder for structured, multi-step forms. Drag fields and sections around, configure validation rules, then publish — anyone with the share link gets the form rendered at runtime from the stored config. Responses come back to a dashboard with a per-submission detail view.

- ⚔️ **Pokeverse** — A full Pokémon experience built on top of PokéAPI. Browse a virtualized Pokédex, drill into rich detail pages (stats, evolutions, moves, sprites, varieties), then assemble a team and run turn-based battles in a multi-screen flow — setup → team selection → loading → battle.

- ❌⭕ **Super Tic-Tac-Toe** — Tic-tac-toe with a strategic twist. Play on a 3×3 grid of boards where your move dictates which board your opponent must play on next. Local two-player, with a guided start popup and live instructions.

- ✍️ **Blogify** — A blogging platform with first-class **Notebooks** — curated collections of blogs published together as a unit. Rich text editing via Tiptap, image uploads, an author-discovery feed, a personal library, and shareable detail pages.

- 💸 **BudgetBuddy** — A personal expense tracker with a layout shell and three views: home for quick entry, overview for the running ledger, and statistics for charted breakdowns. Filters, categories, and Recharts visualizations.

- 📊 **Sorting Visualizer** — Watch sorting algorithms run frame-by-frame. Pick an algorithm, scrub the speed, and read the algorithm-info panel for complexity and behavior. Live statistics track comparisons and swaps as the bars dance.

- 🃏 **Poke-Memory** — A Pokémon-themed memory matching game. Configure grid size and difficulty, flip cards, match pairs, and get a results screen at the end.

- 🏦 **Loan Wizard** — An EMI calculator that flips into an affordability check. Enter loan inputs and see amortization broken down visually, or work backward from your income to see what you can actually afford.

- 🌳 **JSON Visualizer** — Paste, upload, or fetch JSON and explore it as a collapsible tree. Web-worker parsing keeps the UI responsive on huge payloads, breadcrumb navigation tracks where you are deep in the structure.

- 📝 **Markdown Live** — A two-pane Markdown editor with live preview, syntax highlighting, dark mode, and clipboard integration. GFM via `marked`, styled previews via Tailwind typography.

- 🔢 **Sudoku** — Generated puzzles across three difficulty levels, with cell validation, a virtual numpad for mobile, and a custom hook driving the game state.

- ❓ **Quizzo** — A quiz engine with a setup → play → result flow. Configure topic and length, answer timed questions, get a scored breakdown at the end.

- 🍳 **Recipe Haven** — A recipe browser on top of TheMealDB. Search by name, browse by category, alphabet, or area, then drill into a meal detail page with ingredients and step-by-step instructions.

---

## Tech Stack

| | |
|---|---|
| Framework | React 19 + TypeScript |
| Build Tool | Vite 7 (with React Compiler enabled) |
| Routing | React Router 7 |
| Styling | Tailwind CSS 4 |
| State | Redux Toolkit (global) + TanStack Query (server) |
| Forms | React Hook Form + Yup |
| Editor | Tiptap |
| DnD | dnd-kit |
| Charts | Recharts |
| Auth | JWT (access + refresh) via `axios` interceptors |
| Image Hosting | ImgBB |
| Deployment | Firebase Hosting |

---

## Structure & Patterns

```
src/
├── apps/          # one folder per mini-app, fully isolated
├── auth/          # login, register, forgot-password, JWT handling
├── components/    # cross-app layout, modals, header/footer
├── shared/        # apiClient, queryClient, app catalog, utilities
├── store/         # Redux slices (one per app that needs global state)
├── styles/        # theme provider + Tailwind globals
├── ui/            # reusable primitives (inputs, dialogs, etc.)
├── App.tsx        # providers stack
└── Router.tsx     # nested route definitions for every app
```

Each app under `src/apps/` is self-contained — its own components, hooks, helpers, and (where needed) Redux slice. Apps share infrastructure (auth, API client, query client, UI primitives) but otherwise don't reach into each other. Adding a new app means creating a folder, registering it in `shared/apps.ts`, and wiring its routes in `Router.tsx` — nothing else needs to change.

State is split deliberately: server data goes through TanStack Query (caching, retries, mutations), while genuinely global UI state (auth, in-progress quiz, form-builder draft, battle state) lives in Redux Toolkit slices.

Auth is centralized in an `axios` instance with interceptors that attach access tokens, transparently refresh on 401, and clear credentials on refresh failure — every app calls the same client and gets auth handling for free.

---

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment
# Create a .env file with:
#   VITE_API_URL=<your express-ts backend URL>
#   VITE_IMGBB_API_KEY=<your ImgBB key>

# Dev server with hot reload
npm run dev

# Production build
npm run build
npm run preview
```

A Dockerfile is included for containerized dev — `docker build -t react-lab .` then run with port 5173 exposed.

---

*This is a living playground — apps get rewritten, new ones get added, and the shared infrastructure evolves alongside them. Documentation will grow with it.*