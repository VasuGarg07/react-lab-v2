# Adding a New App

Step-by-step checklist for adding a new mini-app to the monorepo.
Replace `<app>` with your app's folder name (e.g. `task-board`) and `<App>` with its display name (e.g. `Task Board`) throughout.

---

## 1. Scaffold the app folder

Copy `apps/_templates` into a new folder:

```
apps/
└── <app>/          ← copy from apps/_templates
```

Then make these replacements inside the copied files:

| File | What to change |
|---|---|
| `package.json` | `"name": "@react-lab/<app>"` |
| `index.html` | `<title><App></title>` |
| `vite.config.ts` | Add `server: { port: <PORT>, strictPort: true }` |

Pick the next available port in sequence (current last port is **5186** for formlyst).

---

## 2. Register in pnpm workspace

`pnpm-workspace.yaml` already includes `apps/*` — no change needed. Just run:

```
pnpm install
```

This links the new package into the workspace.

---

## 3. Add root convenience scripts

In the root `package.json`, add to the `scripts` block:

```json
"dev:<app>":   "pnpm --filter @react-lab/<app> dev",
"build:<app>": "pnpm --filter @react-lab/<app> build",
"deploy:<app>": "pnpm build:<app> && firebase deploy --only hosting:<firebase-target>"
```

---

## 4. Add to Turbo (nothing to change)

`turbo.json` runs tasks across all workspace packages automatically. No changes needed.

---

## 5. Create the Firebase Hosting site

```
firebase hosting:sites:create react-lab-<app>
```

This only needs to be done once. The site ID must be globally unique across all Firebase projects.

---

## 6. Add to `.firebaserc`

Under `targets.react-lab-v2.hosting`, add:

```json
"react-lab-<app>": ["react-lab-<app>"]
```

---

## 7. Add to `firebase.json`

Add a new entry to the `hosting` array:

```json
{
  "target": "react-lab-<app>",
  "public": "apps/<app>/dist",
  "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
  "rewrites": [{ "source": "**", "destination": "/index.html" }]
}
```

---

## 8. Add to showcase

**`apps/showcase/.env.development`** — add the dev URL:
```
VITE_URL_<APP_UPPER>=http://localhost:<PORT>
```

**`apps/showcase/.env.production`** — add the production URL:
```
VITE_URL_<APP_UPPER>=https://react-lab-<app>.web.app
```

**`apps/showcase/src/apps.ts`** — add to the `AppInfo` interface if needed, then add an entry to the `Apps` array:

```ts
{
    name: '<App>',
    path: '/<app>',
    url: import.meta.env.VITE_URL_<APP_UPPER>,
    tag: '<short tagline>',
    image: '/cover/<app>.webp',
    visible: true,
    description: '...',
    techStack: ['...'],
    icon: SomeIcon,
},
```

Add the cover image to `apps/showcase/public/cover/<app>.webp`.

---

## 9. Add to the CLI (`scripts/react-lab-cli.mjs`)

Add an entry to the `APPS` array:

```js
{ name: '<app>', pkg: '@react-lab/<app>', firebase: 'react-lab-<app>' },
```

---

## 10. Update `README.md`

- Add a row to the **Live** table with the Firebase URL
- Add a bullet to the **Applications** section
- Add the app folder to the **Structure** tree

---

## Checklist

- [ ] `apps/<app>/` scaffolded from `_templates`, package name and port set
- [ ] `pnpm install` run
- [ ] `dev:<app>`, `build:<app>`, `deploy:<app>` added to root `package.json`
- [ ] `firebase hosting:sites:create react-lab-<app>` run
- [ ] `.firebaserc` updated
- [ ] `firebase.json` updated
- [ ] `showcase/.env.development` updated
- [ ] `showcase/.env.production` updated
- [ ] `showcase/src/apps.ts` entry added + cover image added
- [ ] `scripts/react-lab-cli.mjs` APPS array updated
- [ ] `README.md` updated
