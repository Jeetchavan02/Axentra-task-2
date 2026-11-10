import type { Reward } from "../types";

export const REWARDS: Reward[] = [
  { id: "rw_credit_500", title: "₹500 Store Credit", description: "Instant credit applied to your next payout.", cost: 400, minTier: "bronze", stock: null, icon: "credit" },
  { id: "rw_swag", title: "Axentra Swag Box", description: "Hoodie, bottle and stickers shipped to you.", cost: 900, minTier: "bronze", stock: 25, icon: "gift" },
  { id: "rw_webinar", title: "Partner Webinar Pass", description: "Seat at the monthly growth masterclass.", cost: 1200, minTier: "silver", stock: 40, icon: "ticket" },
  { id: "rw_boost", title: "Commission Boost (30 days)", description: "+2% commission on every conversion for a month.", cost: 2500, minTier: "silver", stock: null, icon: "zap" },
  { id: "rw_credit_2500", title: "₹2,500 Store Credit", description: "Bigger credit, paid with your next settlement.", cost: 2000, minTier: "gold", stock: null, icon: "credit" },
  { id: "rw_charity", title: "Donate to a Cause", description: "We donate ₹1,000 in your name.", cost: 800, minTier: "bronze", stock: null, icon: "heart" },
  { id: "rw_retreat", title: "Annual Partner Retreat", description: "Two-night retreat with the Axentra team.", cost: 9000, minTier: "gold", stock: 5, icon: "crown" },
  { id: "rw_vip", title: "VIP Launch Access", description: "First access to every new product launch.", cost: 6000, minTier: "platinum", stock: 10, icon: "crown" },
];
