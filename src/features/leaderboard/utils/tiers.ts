import { TIERS } from "../constants/tiers";
import type { Tier, TierId } from "../types";

export const getTierForPoints = (points: number): Tier =>
  [...TIERS].reverse().find((tier) => points >= tier.minPoints) ?? TIERS[0];

export const getTierIndex = (id: TierId): number => TIERS.findIndex((tier) => tier.id === id);

export const getNextTier = (tier: Tier): Tier | null => TIERS[getTierIndex(tier.id) + 1] ?? null;

export interface TierProgress {
  current: Tier;
  next: Tier | null;
  pointsToNext: number;
  /** 0-100 progress through the current tier band. */
  percent: number;
}

export const getTierProgress = (points: number): TierProgress => {
  const current = getTierForPoints(points);
  const next = getNextTier(current);
  if (!next) return { current, next: null, pointsToNext: 0, percent: 100 };
  const span = next.minPoints - current.minPoints;
  const percent = Math.min(100, ((points - current.minPoints) / span) * 100);
  return { current, next, pointsToNext: next.minPoints - points, percent };
};

export const meetsTier = (points: number, required: TierId): boolean =>
  getTierIndex(getTierForPoints(points).id) >= getTierIndex(required);
