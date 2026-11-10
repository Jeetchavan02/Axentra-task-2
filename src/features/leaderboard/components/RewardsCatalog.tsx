import { Card, CardContent, CardHeader, CardTitle } from "@src/components/ui/card";
import { TIERS } from "../constants/tiers";
import { getRemainingStock } from "../services/rewardsService";
import { meetsTier } from "../utils/tiers";
import RewardCard from "./RewardCard";
import type { Reward, RewardsState } from "../types";

interface RewardsCatalogProps {
  rewards: Reward[];
  state: RewardsState;
  lifetimePoints: number;
  availablePoints: number;
  onRedeem: (reward: Reward) => void;
}

export default function RewardsCatalog({ rewards, state, lifetimePoints, availablePoints, onRedeem }: RewardsCatalogProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Rewards Catalog</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
          {rewards.map((reward) => (
            <RewardCard
              key={reward.id}
              reward={reward}
              requiredTier={TIERS.find((t) => t.id === reward.minTier) ?? TIERS[0]}
              unlocked={meetsTier(lifetimePoints, reward.minTier)}
              affordable={availablePoints >= reward.cost}
              remainingStock={getRemainingStock(reward, state)}
              onRedeem={onRedeem}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
