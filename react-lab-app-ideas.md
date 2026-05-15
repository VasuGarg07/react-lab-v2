# React Lab — New App Ideas

A backlog of mini-apps to potentially add to the lab. Names are working titles. Each entry includes scope hints and which category it fills.

---

## Productivity

- [ ] **Streakly** — Habit tracker with daily check-ins, streak chains, and a weekly heatmap. Add habits, mark them done, see how long you've kept the chain alive. Auth-protected, per-user data. Sibling to BudgetBuddy in the personal-improvement category.

- [ ] **Tempo** — Pomodoro timer with task focus. Pick a task, pick a duration (25/50/custom), run timed work + break cycles. Weekly focus stats and per-task time logs. Optional sound cues via Tone.js.

- [ ] **Bookshelf** — Personal reading tracker. Add books via Open Library API (auto-fills covers and metadata), mark as reading/finished/want-to-read, rate, write notes. Same auth + per-user pattern as Blogify.

## Design / Creative

- [ ] **Palette** — Color palette generator. Pick a base color, get harmonies (analogous, triadic, complementary, split-complementary), check WCAG contrast ratios between any two swatches, export as Tailwind config, CSS variables, or hex list. No backend needed.

- [ ] **Glyph** — SVG icon playground. Browse the full Lucide set, customize stroke width, size, and color, copy as JSX or raw SVG. Useful for designers picking icons before coding.

## Data / Utility

- [ ] **Cronify** — Visual cron expression builder. Pick minutes/hours/days/months/weekdays through dropdowns and toggles, see the resulting cron string, the human-readable description, and the next 5 fire times. Web-worker'd parsing in the spirit of JSON Visualizer.

- [ ] **Diffly** — Side-by-side text and JSON diff viewer. Paste two blobs, see additions/removals/changes highlighted line-by-line. Optional "smart merge" mode for JSON that picks per-key.

- [ ] **Regex Lab** — Regex tester with live match highlighting, capture group inspection, common-pattern presets (email, URL, IPv4, etc.), and explanations of what each token in your pattern does.

## Games

- [ ] **Minesweeper** — Classic implementation. Configurable grid sizes (Easy/Medium/Hard), flag and reveal mechanics, timer, win/lose states. Fits cleanly alongside Sudoku and Super Tic-Tac-Toe — no backend needed.

- [ ] **2048** — Tile-merging puzzle. Arrow-key controls, swipe support on mobile, best-score tracking via localStorage. Small scope, ships fast.

- [ ] **Wordl** — Word guessing game (5-letter, 6 attempts, color feedback). Daily seed mode + unlimited mode. Word list bundled at build time.

## Audio

- [ ] **Metronome** — Variable BPM, time signatures (4/4, 3/4, 6/8, custom), accent patterns, tap-to-set-tempo. Tone.js for audio. Visual beat indicator. Small scope, polished result.

---

## My pick

If shipping order matters, **Palette** is the strongest first candidate. It's small enough for a weekend, visually striking on the homepage grid, genuinely useful in real life, and fits the Tailwind-heavy stack. Plus the lab has no design-tools category yet.
