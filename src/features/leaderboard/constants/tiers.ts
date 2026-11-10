import type { Tier } from "../types";

export const TIERS: Tier[] = [
  { id: "bronze", name: "Bronze", minPoints: 0, perk: "5% commission on every conversion" },
  { id: "silver", name: "Silver", minPoints: 5000, perk: "7% commission and early campaign access" },
  { id: "gold", name: "Gold", minPoints: 12000, perk: "10% commission and a dedicated manager" },
  { id: "platinum", name: "Platinum", minPoints: 25000, perk: "12% commission and quarterly bonuses" },
];
