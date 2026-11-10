import { Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@src/components/ui/card";
import { POINTS_RULES } from "../constants/options";

const rules = [
  { label: "Each referral", value: `${POINTS_RULES.perReferral} pts` },
  { label: "Each conversion", value: `${POINTS_RULES.perConversion} pts` },
  { label: `Every ₹${POINTS_RULES.revenuePerPoint} revenue`, value: "1 pt" },
];

export default function PointsRulesCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Info className="h-5 w-5 text-blue-600" />
          How points work
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {rules.map((rule) => (
          <div key={rule.label} className="flex justify-between text-sm">
            <span className="text-gray-600">{rule.label}</span>
            <span className="font-semibold text-gray-900">{rule.value}</span>
          </div>
        ))}
        <p className="border-t pt-2 text-xs text-gray-500">
          Tier is based on lifetime points. Spending points on rewards never lowers your tier.
        </p>
      </CardContent>
    </Card>
  );
}
