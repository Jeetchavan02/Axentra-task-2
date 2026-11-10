# Axentra Referrals – Leaderboard & Rewards

React 19 + TypeScript + Vite + Tailwind frontend for the Axentra referral app.
This submission keeps the existing referral pages unchanged and adds one new
page: **Leaderboard & Rewards** at `/leaderboard`.

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:5175/leaderboard. Full steps, checks and troubleshooting
are in [RUNNING.md](RUNNING.md).

## The new page

- Ranks referrers by points, revenue, referrals or conversion, with period, tier and search filters, a top-3 podium, rank movement and CSV export.
- Tier progress (Bronze, Silver, Gold, Platinum), a rewards catalog with tier, points and stock rules, and a redemption history.
- Runs on local mock data; redemptions persist in `localStorage`.
- Code lives in `src/features/leaderboard/` (see its own README for structure and rules).

## Stack

React 19, TypeScript, Vite 7, Tailwind CSS 3, Radix UI components, lucide-react, react-router-dom 7.

## Local development notes

- `src/auth/*` are local stand-ins (the original auth module was not shipped).
  In dev, `ensureDevSession` seeds a placeholder `referral_user_token` cookie so the
  router does not redirect to the main Axentra domain. This is skipped in
  production builds.
- The original pages call a backend that is not bundled here, so they show empty
  states. The Leaderboard & Rewards page needs no backend.
