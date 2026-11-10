import { Download, RefreshCw, Search } from "lucide-react";
import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@src/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@src/components/ui/select";
import { METRIC_OPTIONS, PERIOD_OPTIONS } from "../constants/options";
import { TIERS } from "../constants/tiers";
import type { Period, RankMetric, TierId } from "../types";

interface LeaderboardFiltersProps {
  period: Period;
  onPeriodChange: (period: Period) => void;
  metric: RankMetric;
  onMetricChange: (metric: RankMetric) => void;
  query: string;
  onQueryChange: (query: string) => void;
  tierFilter: TierId | "all";
  onTierFilterChange: (tier: TierId | "all") => void;
  onExport: () => void;
  onRefresh: () => void;
}

export default function LeaderboardFilters(props: LeaderboardFiltersProps) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <Tabs value={props.metric} onValueChange={(value) => props.onMetricChange(value as RankMetric)}>
        <TabsList>
          {METRIC_OPTIONS.map((option) => (
            <TabsTrigger key={option.value} value={option.value}>
              {option.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="flex flex-wrap items-center gap-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            value={props.query}
            onChange={(event) => props.onQueryChange(event.target.value)}
            placeholder="Search referrers"
            className="w-52 pl-9"
          />
        </div>
        <Select value={props.tierFilter} onValueChange={(value) => props.onTierFilterChange(value as TierId | "all")}>
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All tiers</SelectItem>
            {TIERS.map((tier) => (
              <SelectItem key={tier.id} value={tier.id}>
                {tier.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={props.period} onValueChange={(value) => props.onPeriodChange(value as Period)}>
          <SelectTrigger className="w-[160px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {PERIOD_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={props.onRefresh}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
        <Button onClick={props.onExport}>
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>
    </div>
  );
}
