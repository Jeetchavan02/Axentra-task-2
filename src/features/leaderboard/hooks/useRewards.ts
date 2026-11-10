import { useCallback, useEffect, useState } from "react";
import {
  fetchRewards,
  fetchRewardsState,
  redeemReward,
  resetRewards,
  RedemptionError,
} from "../services/rewardsService";
import type { Referrer, Reward, RewardsState } from "../types";

const EMPTY: RewardsState = { redemptions: [], stockUsed: {} };

export const useRewards = () => {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [state, setState] = useState<RewardsState>(EMPTY);

  useEffect(() => {
    fetchRewards().then(setRewards);
    fetchRewardsState().then(setState);
  }, []);

  /** Resolves to an error message, or null on success. */
  const redeem = useCallback(async (referrer: Referrer, reward: Reward): Promise<string | null> => {
    try {
      setState(await redeemReward(referrer, reward));
      return null;
    } catch (error) {
      return error instanceof RedemptionError ? error.message : "Something went wrong.";
    }
  }, []);

  const reset = useCallback(async () => setState(await resetRewards()), []);

  return { rewards, state, redeem, reset };
};
