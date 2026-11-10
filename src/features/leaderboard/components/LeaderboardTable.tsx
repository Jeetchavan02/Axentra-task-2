import { Card, CardContent, CardHeader, CardTitle } from "@src/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@src/components/ui/table";
import { cn } from "@src/lib/utils";
import { formatCurrency, formatNumber, formatPercent } from "../utils/format";
import RankMovement from "./RankMovement";
import ReferrerAvatar from "./ReferrerAvatar";
import TierBadge from "./TierBadge";
import type { LeaderboardEntry } from "../types";

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  selectedId?: string;
  onSelect: (entry: LeaderboardEntry) => void;
}

export default function LeaderboardTable({ entries, selectedId, onSelect }: LeaderboardTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Full Rankings</CardTitle>
      </CardHeader>
      <CardContent>
        {entries.length === 0 ? (
          <p className="py-10 text-center text-gray-500">No referrers match your search.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Rank</TableHead>
                <TableHead>Referrer</TableHead>
                <TableHead>Tier</TableHead>
                <TableHead className="text-right">Referrals</TableHead>
                <TableHead className="text-right">Conversion</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
                <TableHead className="text-right">Points</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map((entry) => (
                <TableRow
                  key={entry.referrer.id}
                  onClick={() => onSelect(entry)}
                  className={cn("cursor-pointer", selectedId === entry.referrer.id && "bg-gray-50")}
                >
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="w-6 font-semibold text-gray-900">{entry.rank}</span>
                      <RankMovement rank={entry.rank} previousRank={entry.previousRank} />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <ReferrerAvatar name={entry.referrer.name} size="sm" />
                      <div>
                        <p className="font-medium text-gray-900">{entry.referrer.name}</p>
                        <p className="text-xs text-gray-500">{entry.referrer.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <TierBadge tier={entry.tier} />
                  </TableCell>
                  <TableCell className="text-right">{formatNumber(entry.stats.referrals)}</TableCell>
                  <TableCell className="text-right">{formatPercent(entry.conversionRate)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(entry.stats.revenue)}</TableCell>
                  <TableCell className="text-right font-semibold">{formatNumber(entry.points)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
