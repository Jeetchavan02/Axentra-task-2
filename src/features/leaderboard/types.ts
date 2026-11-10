export type Period = "7d" | "30d" | "90d" | "all";

export type RankMetric = "points" | "revenue" | "referrals" | "conversionRate";

export type TierId = "bronze" | "silver" | "gold" | "platinum";

export interface Tier {
  id: TierId;
  name: string;
  minPoints: number;
  perk: string;
}

export interface Referrer {
  id: string;
  name: string;
  email: string;
  joinedAt: string;
  /** Lifetime totals, used for tier calculation. */
  lifetime: PeriodStats;
  /** Share of lifetime activity that happened in each window. */
  periods: Record<Exclude<Period, "all">, PeriodStats>;
  /** Multiplier describing recent trend; >1 means climbing the board. */
  momentum: number;
}

export interface PeriodStats {
  referrals: number;
  conversions: number;
  revenue: number;
}

export interface LeaderboardEntry {
  rank: number;
  previousRank: number;
  referrer: Referrer;
  stats: PeriodStats;
  points: number;
  conversionRate: number;
  tier: Tier;
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  cost: number;
  minTier: TierId;
  stock: number | null;
  icon: "gift" | "ticket" | "credit" | "crown" | "zap" | "heart";
}

export interface Redemption {
  id: string;
  rewardId: string;
  rewardTitle: string;
  referrerId: string;
  cost: number;
  redeemedAt: string;
}

export interface RewardsState {
  redemptions: Redemption[];
  stockUsed: Record<string, number>;
}
