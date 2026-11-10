import { DollarSign, Target, Trophy, Users, type LucideIcon } from "lucide-react";
import { Card, CardContent } from "@src/components/ui/card";
import { formatCurrency, formatNumber, formatPercent } from "../utils/format";
import type { LeaderboardEntry } from "../types";

interface SummaryStatsProps {
  entries: LeaderboardEntry[];
}

interface Stat {
  title: string;
  value: string;
  hint: string;
  icon: LucideIcon;
  tint: string;
}

export default function SummaryStats({ entries }: SummaryStatsProps) {
  const revenue = entries.reduce((sum, e) => sum + e.stats.revenue, 0);
  const referrals = entries.reduce((sum, e) => sum + e.stats.referrals, 0);
  const conversions = entries.reduce((sum, e) => sum + e.stats.conversions, 0);
  const leader = entries[0];

  const stats: Stat[] = [
    { title: "Active Referrers", value: formatNumber(entries.length), hint: `${formatNumber(referrals)} referrals`, icon: Users, tint: "bg-blue-50 text-blue-600" },
    { title: "Revenue Driven", value: formatCurrency(revenue), hint: `${formatNumber(conversions)} conversions`, icon: DollarSign, tint: "bg-orange-50 text-orange-600" },
    { title: "Avg. Conversion", value: formatPercent(referrals ? (conversions / referrals) * 100 : 0), hint: "across all referrers", icon: Target, tint: "bg-purple-50 text-purple-600" },
    { title: "Current Leader", value: leader?.referrer.name ?? "N/A", hint: leader ? `${formatNumber(leader.points)} points` : "No data", icon: Trophy, tint: "bg-green-50 text-green-600" },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map(({ title, value, hint, icon: Icon, tint }) => (
        <Card key={title}>
          <CardContent className="flex items-center gap-4 p-5">
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${tint}`}>
              <Icon className="h-6 w-6" />
            </div>
            <div className="min-w-0">
              <p className="text-sm text-gray-600">{title}</p>
              <p className="truncate text-xl font-bold text-gray-900">{value}</p>
              <p className="truncate text-xs text-gray-500">{hint}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
