import { Coins } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@src/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@src/components/ui/select";
import { formatNumber } from "../utils/format";
import ReferrerAvatar from "./ReferrerAvatar";
import TierBadge from "./TierBadge";
import TierProgressBar from "./TierProgressBar";
import type { Referrer, Tier } from "../types";

interface StandingCardProps {
  referrers: Referrer[];
  selectedId: string;
  onSelectedChange: (id: string) => void;
  tier: Tier;
  lifetimePoints: number;
  availablePoints: number;
  rank?: number;
}

export default function StandingCard({
  referrers,
  selectedId,
  onSelectedChange,
  tier,
  lifetimePoints,
  availablePoints,
  rank,
}: StandingCardProps) {
  const selected = referrers.find((r) => r.id === selectedId);
  if (!selected) return null;

  return (
    <Card>
      <CardHeader className="space-y-3">
        <CardTitle className="text-xl">Your Standing</CardTitle>
        <Select value={selectedId} onValueChange={onSelectedChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {referrers.map((referrer) => (
              <SelectItem key={referrer.id} value={referrer.id}>
                {referrer.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex items-center gap-3">
          <ReferrerAvatar name={selected.name} size="md" />
          <div>
            <p className="font-semibold text-gray-900">{selected.name}</p>
            <div className="mt-1 flex items-center gap-2">
              <TierBadge tier={tier} />
              {rank && <span className="text-xs text-gray-500">Rank #{rank}</span>}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-yellow-50 p-4">
          <div>
            <p className="text-sm text-gray-600">Spendable points</p>
            <p className="text-2xl font-bold text-gray-900">{formatNumber(availablePoints)}</p>
          </div>
          <Coins className="h-8 w-8 text-yellow-600" />
        </div>

        <TierProgressBar points={lifetimePoints} />
      </CardContent>
    </Card>
  );
}
