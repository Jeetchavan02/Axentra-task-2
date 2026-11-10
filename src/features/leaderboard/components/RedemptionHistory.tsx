import { History } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@src/components/ui/card";
import { Button } from "@src/components/ui/button";
import { formatDate, formatNumber } from "../utils/format";
import type { Redemption } from "../types";

interface RedemptionHistoryProps {
  redemptions: Redemption[];
  onReset: () => void;
}

export default function RedemptionHistory({ redemptions, onReset }: RedemptionHistoryProps) {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle className="flex items-center gap-2 text-xl">
          <History className="h-5 w-5 text-gray-500" />
          Redemption History
        </CardTitle>
        {redemptions.length > 0 && (
          <Button variant="ghost" size="sm" onClick={onReset}>
            Clear all
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {redemptions.length === 0 ? (
          <p className="py-6 text-center text-gray-500">No rewards redeemed yet</p>
        ) : (
          <ul className="divide-y">
            {redemptions.slice(0, 8).map((item) => (
              <li key={item.id} className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.rewardTitle}</p>
                  <p className="text-xs text-gray-500">{formatDate(item.redeemedAt)}</p>
                </div>
                <span className="text-sm font-semibold text-red-600">-{formatNumber(item.cost)}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
