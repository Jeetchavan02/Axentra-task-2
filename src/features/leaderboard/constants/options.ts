import type { Period, RankMetric } from "../types";

export const PERIOD_OPTIONS: { value: Period; label: string }[] = [
  { value: "7d", label: "Last 7 Days" },
  { value: "30d", label: "Last 30 Days" },
  { value: "90d", label: "Last 90 Days" },
  { value: "all", label: "All Time" },
];

export const METRIC_OPTIONS: { value: RankMetric; label: string }[] = [
  { value: "points", label: "Points" },
  { value: "revenue", label: "Revenue" },
  { value: "referrals", label: "Referrals" },
  { value: "conversionRate", label: "Conversion" },
];

export const POINTS_RULES = {
  perReferral: 10,
  perConversion: 50,
  revenuePerPoint: 100,
} as const;
