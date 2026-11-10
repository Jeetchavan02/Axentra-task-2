import type { LeaderboardEntry } from "../types";

const escapeCell = (value: string | number): string => {
  const text = String(value);
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
};

export const entriesToCsv = (entries: LeaderboardEntry[]): string => {
  const header = ["Rank", "Name", "Email", "Tier", "Referrals", "Conversions", "Conversion %", "Revenue", "Points"];
  const rows = entries.map((entry) => [
    entry.rank,
    entry.referrer.name,
    entry.referrer.email,
    entry.tier.name,
    entry.stats.referrals,
    entry.stats.conversions,
    entry.conversionRate.toFixed(1),
    entry.stats.revenue,
    entry.points,
  ]);
  return [header, ...rows].map((row) => row.map(escapeCell).join(",")).join("\n");
};

export const downloadCsv = (filename: string, content: string): void => {
  const url = URL.createObjectURL(new Blob([content], { type: "text/csv;charset=utf-8;" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};
