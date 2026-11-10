import { calculateConversionRate, calculatePoints } from "./points";
import { getTierForPoints } from "./tiers";
import type { LeaderboardEntry, Period, PeriodStats, RankMetric, Referrer, TierId } from "../types";

export const getStatsForPeriod = (referrer: Referrer, period: Period): PeriodStats =>
  period === "all" ? referrer.lifetime : referrer.periods[period];

const scoreOf = (stats: PeriodStats, metric: RankMetric): number => {
  switch (metric) {
    case "revenue":
      return stats.revenue;
    case "referrals":
      return stats.referrals;
    case "conversionRate":
      return calculateConversionRate(stats);
    default:
      return calculatePoints(stats);
  }
};

const sortByMetric = (rows: { stats: PeriodStats; referrer: Referrer }[], metric: RankMetric) =>
  [...rows].sort(
    (a, b) =>
      scoreOf(b.stats, metric) - scoreOf(a.stats, metric) ||
      b.stats.revenue - a.stats.revenue ||
      a.referrer.name.localeCompare(b.referrer.name),
  );

/** Re-weights stats by momentum to approximate the previous window's standings. */
const previousStats = (stats: PeriodStats, momentum: number): PeriodStats => ({
  referrals: Math.round(stats.referrals / momentum),
  conversions: Math.round(stats.conversions / momentum),
  revenue: Math.round(stats.revenue / momentum),
});

export const buildLeaderboard = (
  referrers: Referrer[],
  period: Period,
  metric: RankMetric,
): LeaderboardEntry[] => {
  const current = referrers.map((referrer) => ({ referrer, stats: getStatsForPeriod(referrer, period) }));
  const previous = referrers.map((referrer) => ({
    referrer,
    stats: previousStats(getStatsForPeriod(referrer, period), referrer.momentum),
  }));

  const previousRanks = new Map(
    sortByMetric(previous, metric).map((row, index) => [row.referrer.id, index + 1]),
  );

  return sortByMetric(current, metric).map((row, index) => ({
    rank: index + 1,
    previousRank: previousRanks.get(row.referrer.id) ?? index + 1,
    referrer: row.referrer,
    stats: row.stats,
    points: calculatePoints(row.stats),
    conversionRate: calculateConversionRate(row.stats),
    tier: getTierForPoints(calculatePoints(row.referrer.lifetime)),
  }));
};

export const filterEntries = (entries: LeaderboardEntry[], query: string): LeaderboardEntry[] => {
  const needle = query.trim().toLowerCase();
  if (!needle) return entries;
  return entries.filter(
    ({ referrer }) =>
      referrer.name.toLowerCase().includes(needle) || referrer.email.toLowerCase().includes(needle),
  );
};

export const filterByTier = (entries: LeaderboardEntry[], tier: TierId | "all"): LeaderboardEntry[] =>
  tier === "all" ? entries : entries.filter((entry) => entry.tier.id === tier);
