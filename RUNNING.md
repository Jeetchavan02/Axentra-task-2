# How to run this project

## Requirements

- Node.js 20.19 or newer (tested on 22)
- npm 10 or newer

## Steps

1. Open a terminal in the project folder (the one containing `package.json`).
2. Install dependencies (first time only, needs internet):
   ```bash
   npm install
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
4. Open the new page: http://localhost:5175/leaderboard

No backend, database or environment variables are needed. A dev-only login
cookie is set automatically, so you are not redirected to an external site.

## What to look at

- **Leaderboard tab:** switch Points / Revenue / Referrals / Conversion, change the period, filter by tier, search a name, click a referrer to select them, and use Export for a CSV.
- **Rewards tab:** pick a referrer under "Your Standing", then redeem a reward. Points drop, history updates, stock and tier locks are enforced. "Clear all" resets redemptions.
- **Mobile:** narrow the browser window below 1024px to see the drawer sidebar and compact table.
- The sidebar entry is called "Leaderboard & Rewards"; the original pages are still available there.

## Checks (optional)

```bash
npx tsc -p tsconfig.app.json --noEmit   # type check, expects 0 errors
npm run build                           # production build into dist/
npm run preview                         # serve the production build
```

## Troubleshooting

- **Port 5175 in use:** stop the other process, or run `npx vite --port 5180`.
- **Redirected to example.com:** you are not on the dev server (production builds do not seed the dev cookie). Use `npm run dev`.
- **Reset the page's saved data:** in the browser console run
  `localStorage.removeItem("axentra.leaderboard.rewards")` and reload.
- **Old pages look empty:** expected; they call a backend that is not part of this submission.

## Where the code is

- `src/features/leaderboard/` – the new page (components, hooks, services, utils, mock data)
- `src/routers/AppRouter.tsx` – `/leaderboard` route
- `src/components/layouts/` – sidebar (now a drawer on mobile) and mobile top bar
- `src/auth/` – local stand-ins for the missing auth module
