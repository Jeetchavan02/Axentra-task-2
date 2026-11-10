import { Award } from "lucide-react";
import { cn } from "@src/lib/utils";
import { TIER_STYLES } from "../constants/tierStyles";
import type { Tier } from "../types";

interface TierBadgeProps {
  tier: Tier;
  className?: string;
}

export default function TierBadge({ tier, className }: TierBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold",
        TIER_STYLES[tier.id].chip,
        className,
      )}
    >
      <Award className="h-3 w-3" />
      {tier.name}
    </span>
  );
}
