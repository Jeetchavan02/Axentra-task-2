import { CreditCard, Crown, Gift, Heart, Ticket, Zap, type LucideIcon } from "lucide-react";
import type { Reward } from "../types";

export const REWARD_ICONS: Record<Reward["icon"], LucideIcon> = {
  gift: Gift,
  ticket: Ticket,
  credit: CreditCard,
  crown: Crown,
  zap: Zap,
  heart: Heart,
};
