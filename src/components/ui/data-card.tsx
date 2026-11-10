import { Card, CardContent } from "@src/components/ui/card";
import { Badge } from "@src/components/ui/badge";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import { cn } from "@src/lib/utils";

interface DataCardProps {
  title: string;
  value: string;
  trend?: {
    value: string;
    positive: boolean;
  };
  badge?: string;
}

export function DataCard({ title, value, trend, badge }: DataCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          {/* {badge && (
            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
              {badge}
            </span>
          )} */}
        </div>
        <div className="flex items-baseline justify-between">
          <p className="text-3xl font-bold">{value}</p>
          {trend && (
            <div className={cn(
              "flex items-center text-sm",
              trend.positive ? "text-green-500" : "text-red-500"
            )}>
              {trend.positive ? (
                <ArrowUpIcon className="h-4 w-4 mr-1" />
              ) : (
                <ArrowDownIcon className="h-4 w-4 mr-1" />
              )}
              <span>{trend.value}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}