import { Progress } from "@src/components/ui/progress";
import { TIER_STYLES } from "../constants/tierStyles";
import { formatNumber } from "../utils/format";
import { getTierProgress } from "../utils/tiers";

interface TierProgressBarProps {
  points: number;
}

export default function TierProgressBar({ points }: TierProgressBarProps) {
  const { current, next, pointsToNext, percent } = getTierProgress(points);
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium text-gray-900">{current.name}</span>
        <span className="text-gray-500">{next ? next.name : "Top tier reached"}</span>
      </div>
      <Progress value={percent} className="h-2 bg-gray-100" indicatorClassName={TIER_STYLES[current.id].bar} />
      <p className="text-xs text-gray-500">
        {next ? `${formatNumber(pointsToNext)} points to ${next.name}` : "You have unlocked every perk."}
      </p>
    </div>
  );
}
