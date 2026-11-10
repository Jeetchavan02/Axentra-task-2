import PodiumCard from "./PodiumCard";
import type { LeaderboardEntry } from "../types";

interface PodiumProps {
  entries: LeaderboardEntry[];
  onSelect?: (entry: LeaderboardEntry) => void;
}

/**
 * Stacks 1st, 2nd, 3rd on mobile; from `md` up, CSS order puts first place
 * in the centre like a real podium.
 */
const MD_ORDER = ["md:order-2", "md:order-1", "md:order-3"];

export default function Podium({ entries, onSelect }: PodiumProps) {
  if (entries.length === 0) return null;

  return (
    <div className="grid grid-cols-1 items-end gap-4 md:grid-cols-3">
      {entries.slice(0, 3).map((entry, index) => (
        <div key={entry.referrer.id} className={MD_ORDER[index]}>
          <PodiumCard entry={entry} onSelect={onSelect} />
        </div>
      ))}
    </div>
  );
}
