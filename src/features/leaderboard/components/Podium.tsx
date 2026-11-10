import PodiumCard from "./PodiumCard";
import type { LeaderboardEntry } from "../types";

interface PodiumProps {
  entries: LeaderboardEntry[];
  onSelect?: (entry: LeaderboardEntry) => void;
}

/** Shows the top three with first place in the centre, like a real podium. */
export default function Podium({ entries, onSelect }: PodiumProps) {
  const [first, second, third] = entries;
  if (!first) return null;
  const ordered = [second, first, third].filter(Boolean) as LeaderboardEntry[];

  return (
    <div className="grid grid-cols-1 items-end gap-4 md:grid-cols-3">
      {ordered.map((entry) => (
        <PodiumCard key={entry.referrer.id} entry={entry} onSelect={onSelect} />
      ))}
    </div>
  );
}
