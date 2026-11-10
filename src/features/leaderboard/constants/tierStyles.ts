import type { TierId } from "../types";

interface TierStyle {
  chip: string;
  bar: string;
  ring: string;
  text: string;
}

/** Tailwind classes only, matching the tinted-chip palette used across the app. */
export const TIER_STYLES: Record<TierId, TierStyle> = {
  bronze: { chip: "bg-orange-100 text-orange-800", bar: "bg-orange-500", ring: "ring-orange-200", text: "text-orange-600" },
  silver: { chip: "bg-slate-200 text-slate-700", bar: "bg-slate-500", ring: "ring-slate-300", text: "text-slate-500" },
  gold: { chip: "bg-yellow-100 text-yellow-800", bar: "bg-yellow-500", ring: "ring-yellow-200", text: "text-yellow-600" },
  platinum: { chip: "bg-indigo-100 text-indigo-700", bar: "bg-indigo-500", ring: "ring-indigo-200", text: "text-indigo-600" },
};
