# Leaderboard & Rewards

Ranks referrers by points, revenue, referrals or conversion, and lets each
referrer spend points on rewards unlocked by their tier.

```
leaderboard/
  components/   presentational pieces (podium, table, tier + reward cards)
  constants/    tiers, tier colours, period/metric options, points rules
  data/         seeded referrers and rewards
  hooks/        useLeaderboard, useRewards
  services/     async data access (mock, localStorage-backed redemptions)
  utils/        ranking, points, tiers, csv, formatting
```

## Data

`services/leaderboardService.ts` is the only place that supplies referrers.
Swap `fetchReferrers` for a call such as `getReq("leaderboard", params, baseURL)`
to use a real endpoint. Redemptions persist in `localStorage` under the
`axentra.leaderboard.` prefix.

## Rules

- Points = 10 per referral + 50 per conversion + 1 per ₹100 revenue.
- Tier uses lifetime points: Bronze 0, Silver 5,000, Gold 12,000, Platinum 25,000.
- Rewards need the required tier, enough spendable points, and stock.
