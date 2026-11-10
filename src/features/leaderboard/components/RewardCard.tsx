import { Lock } from "lucide-react";
import { Card, CardContent } from "@src/components/ui/card";
import { Button } from "@src/components/ui/button";
import { Badge } from "@src/components/ui/badge";
import { formatNumber } from "../utils/format";
import { REWARD_ICONS } from "./rewardIcons";
import type { Reward, Tier } from "../types";

interface RewardCardProps {
  reward: Reward;
  requiredTier: Tier;
  unlocked: boolean;
  affordable: boolean;
  remainingStock: number | null;
  onRedeem: (reward: Reward) => void;
}

export default function RewardCard({ reward, requiredTier, unlocked, affordable, remainingStock, onRedeem }: RewardCardProps) {
  const Icon = REWARD_ICONS[reward.icon];
  const soldOut = remainingStock !== null && remainingStock <= 0;

  let label = "Redeem";
  if (!unlocked) label = `Needs ${requiredTier.name}`;
  else if (soldOut) label = "Out of stock";
  else if (!affordable) label = "Not enough points";

  return (
    <Card className="flex flex-col">
      <CardContent className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
            <Icon className="h-5 w-5" />
          </div>
          {remainingStock !== null && (
            <Badge variant={soldOut ? "destructive" : "muted"} size="sm">
              {soldOut ? "Sold out" : `${remainingStock} left`}
            </Badge>
          )}
        </div>
        <div className="flex-1">
          <p className="font-semibold text-gray-900">{reward.title}</p>
          <p className="mt-1 text-sm text-gray-600">{reward.description}</p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">{formatNumber(reward.cost)} pts</span>
          {!unlocked && <Lock className="h-4 w-4 text-gray-400" />}
        </div>
        <Button className="w-full" disabled={!unlocked || !affordable || soldOut} onClick={() => onRedeem(reward)}>
          {label}
        </Button>
      </CardContent>
    </Card>
  );
}
