import { REWARDS } from "../data/rewards";
import { calculatePoints } from "../utils/points";
import { meetsTier } from "../utils/tiers";
import { readStorage, writeStorage } from "./storage";
import type { Redemption, Referrer, Reward, RewardsState } from "../types";

const STATE_KEY = "rewards";
const EMPTY_STATE: RewardsState = { redemptions: [], stockUsed: {} };

export class RedemptionError extends Error {}

const load = (): RewardsState => readStorage<RewardsState>(STATE_KEY, EMPTY_STATE);

export const fetchRewards = async (): Promise<Reward[]> => REWARDS;

export const fetchRewardsState = async (): Promise<RewardsState> => load();

export const pointsSpent = (state: RewardsState, referrerId: string): number =>
  state.redemptions.filter((r) => r.referrerId === referrerId).reduce((sum, r) => sum + r.cost, 0);

export const getAvailablePoints = (referrer: Referrer, state: RewardsState): number =>
  Math.max(0, calculatePoints(referrer.lifetime) - pointsSpent(state, referrer.id));

export const getRemainingStock = (reward: Reward, state: RewardsState): number | null =>
  reward.stock === null ? null : reward.stock - (state.stockUsed[reward.id] ?? 0);

export const redeemReward = async (referrer: Referrer, reward: Reward): Promise<RewardsState> => {
  const state = load();
  const lifetimePoints = calculatePoints(referrer.lifetime);

  if (!meetsTier(lifetimePoints, reward.minTier)) {
    throw new RedemptionError(`Reach ${reward.minTier} tier to unlock this reward.`);
  }
  if (getAvailablePoints(referrer, state) < reward.cost) {
    throw new RedemptionError("Not enough points for this reward.");
  }
  const remaining = getRemainingStock(reward, state);
  if (remaining !== null && remaining <= 0) {
    throw new RedemptionError("This reward is out of stock.");
  }

  const redemption: Redemption = {
    id: `rd_${Date.now()}`,
    rewardId: reward.id,
    rewardTitle: reward.title,
    referrerId: referrer.id,
    cost: reward.cost,
    redeemedAt: new Date().toISOString(),
  };
  const next: RewardsState = {
    redemptions: [redemption, ...state.redemptions],
    stockUsed: { ...state.stockUsed, [reward.id]: (state.stockUsed[reward.id] ?? 0) + 1 },
  };
  writeStorage(STATE_KEY, next);
  return next;
};

export const resetRewards = async (): Promise<RewardsState> => {
  writeStorage(STATE_KEY, EMPTY_STATE);
  return EMPTY_STATE;
};
