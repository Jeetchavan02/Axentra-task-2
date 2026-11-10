import { Crown } from "lucide-react";
import { Card, CardContent } from "@src/components/ui/card";
import { cn } from "@src/lib/utils";
import { formatCurrency, formatNumber } from "../utils/format";
import { TIER_STYLES } from "../constants/tierStyles";
import ReferrerAvatar from "./ReferrerAvatar";
import TierBadge from "./TierBadge";
import type { LeaderboardEntry } from "../types";

const PLACE_STYLES: Record<number, { label: string; badge: string; lift: string }> = {
  1: { label: "1st", badge: "bg-yellow-100 text-yellow-800", lift: "md:-mt-4" },
  2: { label: "2nd", badge: "bg-slate-200 text-slate-700", lift: "" },
  3: { label: "3rd", badge: "bg-orange-100 text-orange-800", lift: "" },
};

interface PodiumCardProps {
  entry: LeaderboardEntry;
  onSelect?: (entry: LeaderboardEntry) => void;
}

export default function PodiumCard({ entry, onSelect }: PodiumCardProps) {
  const place = PLACE_STYLES[entry.rank];
  return (
    <Card
      onClick={() => onSelect?.(entry)}
      className={cn(
        "cursor-pointer text-center transition-shadow hover:shadow-md",
        place.lift,
        entry.rank === 1 && "ring-2 ring-yellow-200",
      )}
    >
      <CardContent className="flex flex-col items-center gap-3 p-6">
        <span className={cn("rounded-full px-3 py-0.5 text-xs font-bold", place.badge)}>{place.label}</span>
        <div className="relative">
          <ReferrerAvatar name={entry.referrer.name} size="lg" className={cn("ring-4", TIER_STYLES[entry.tier.id].ring)} />
          {entry.rank === 1 && <Crown className="absolute -right-2 -top-3 h-6 w-6 rotate-12 text-yellow-500" />}
        </div>
        <div>
          <p className="font-semibold text-gray-900">{entry.referrer.name}</p>
          <TierBadge tier={entry.tier} className="mt-1" />
        </div>
        <div className="grid w-full grid-cols-2 gap-2 border-t pt-3 text-sm">
          <div>
            <p className="font-bold text-gray-900">{formatNumber(entry.points)}</p>
            <p className="text-xs text-gray-500">points</p>
          </div>
          <div>
            <p className="font-bold text-gray-900">{formatCurrency(entry.stats.revenue)}</p>
            <p className="text-xs text-gray-500">revenue</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
