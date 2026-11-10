import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import { cn } from "@src/lib/utils";

interface RankMovementProps {
  rank: number;
  previousRank: number;
}

export default function RankMovement({ rank, previousRank }: RankMovementProps) {
  const delta = previousRank - rank;
  if (delta === 0) {
    return (
      <span className="inline-flex items-center text-xs text-gray-400" title="No change">
        <Minus className="h-3 w-3" />
      </span>
    );
  }
  const up = delta > 0;
  const Icon = up ? ArrowUp : ArrowDown;
  return (
    <span
      className={cn("inline-flex items-center gap-0.5 text-xs font-medium", up ? "text-green-600" : "text-red-600")}
      title={`${up ? "Up" : "Down"} ${Math.abs(delta)} from last period`}
    >
      <Icon className="h-3 w-3" />
      {Math.abs(delta)}
    </span>
  );
}
