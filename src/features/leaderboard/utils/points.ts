import { POINTS_RULES } from "../constants/options";
import type { PeriodStats } from "../types";

export const calculatePoints = (stats: PeriodStats): number =>
  stats.referrals * POINTS_RULES.perReferral +
  stats.conversions * POINTS_RULES.perConversion +
  Math.floor(stats.revenue / POINTS_RULES.revenuePerPoint);

export const calculateConversionRate = (stats: PeriodStats): number =>
  stats.referrals === 0 ? 0 : (stats.conversions / stats.referrals) * 100;
