import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@src/components/ui/card";
import { cn } from "@src/lib/utils";
import { TIERS } from "../constants/tiers";
import { TIER_STYLES } from "../constants/tierStyles";
import { formatNumber } from "../utils/format";
import { getTierIndex } from "../utils/tiers";
import type { LeaderboardEntry, TierId } from "../types";

interface TierLadderProps {
  entries: LeaderboardEntry[];
  currentTier?: TierId;
}

export default function TierLadder({ entries, currentTier }: TierLadderProps) {
  const counts = TIERS.map((tier) => entries.filter((e) => e.tier.id === tier.id).length);
  const currentIndex = currentTier ? getTierIndex(currentTier) : -1;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Reward Tiers</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {TIERS.map((tier, index) => {
          const reached = index <= currentIndex;
          return (
            <div
              key={tier.id}
              className={cn("flex items-start gap-3 rounded-lg border p-3", reached ? "bg-gray-50" : "bg-white")}
            >
              <span className={cn("mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full", TIER_STYLES[tier.id].chip)}>
                {reached ? <Check className="h-4 w-4" /> : <span className="text-xs font-bold">{index + 1}</span>}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-gray-900">{tier.name}</p>
                  <span className="text-xs text-gray-500">{counts[index]} referrers</span>
                </div>
                <p className="text-xs text-gray-500">From {formatNumber(tier.minPoints)} points</p>
                <p className="mt-1 text-sm text-gray-600">{tier.perk}</p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
