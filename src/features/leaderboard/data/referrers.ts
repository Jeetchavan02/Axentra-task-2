import type { PeriodStats, Referrer } from "../types";

type Seed = [name: string, referrals: number, conversions: number, revenue: number, momentum: number];

const SEEDS: Seed[] = [
  ["Aarav Mehta", 940, 312, 1480000, 1.18],
  ["Diya Sharma", 880, 270, 1295000, 0.94],
  ["Kabir Nair", 760, 244, 1120000, 1.32],
  ["Ananya Iyer", 702, 231, 985000, 1.05],
  ["Rohan Kapoor", 655, 190, 842000, 0.88],
  ["Ishita Verma", 590, 188, 811000, 1.21],
  ["Vihaan Reddy", 548, 150, 702000, 0.97],
  ["Meera Joshi", 502, 161, 664000, 1.09],
  ["Arjun Patel", 466, 120, 590000, 0.91],
  ["Saanvi Gupta", 421, 133, 548000, 1.27],
  ["Neil D'Souza", 388, 101, 470000, 1.02],
  ["Tara Bansal", 352, 96, 415000, 0.85],
  ["Yash Malhotra", 310, 88, 362000, 1.14],
  ["Riya Choudhary", 276, 70, 301000, 1.0],
  ["Dev Menon", 241, 62, 268000, 0.93],
  ["Kiara Singh", 205, 52, 214000, 1.22],
  ["Aditya Rao", 172, 41, 176000, 0.89],
  ["Naina Bose", 138, 33, 129000, 1.11],
  ["Samar Khanna", 96, 21, 84000, 1.04],
  ["Pooja Desai", 61, 12, 47000, 0.96],
];

/** Fraction of lifetime activity that falls in each window; varies slightly per referrer. */
const windowShare = (index: number, base: number): number => base * (0.85 + ((index * 37) % 30) / 100);

const slice = (lifetime: PeriodStats, share: number): PeriodStats => ({
  referrals: Math.max(1, Math.round(lifetime.referrals * share)),
  conversions: Math.max(0, Math.round(lifetime.conversions * share)),
  revenue: Math.round((lifetime.revenue * share) / 100) * 100,
});

const slug = (name: string) => name.toLowerCase().replace(/[^a-z]+/g, ".").replace(/^\.|\.$/g, "");

export const REFERRERS: Referrer[] = SEEDS.map(([name, referrals, conversions, revenue, momentum], index) => {
  const lifetime: PeriodStats = { referrals, conversions, revenue };
  return {
    id: `ref_${String(index + 1).padStart(3, "0")}`,
    name,
    email: `${slug(name)}@example.com`,
    joinedAt: new Date(2024, index % 12, 3 + index).toISOString(),
    lifetime,
    periods: {
      "7d": slice(lifetime, windowShare(index, 0.06)),
      "30d": slice(lifetime, windowShare(index, 0.22)),
      "90d": slice(lifetime, windowShare(index, 0.55)),
    },
    momentum,
  };
});
