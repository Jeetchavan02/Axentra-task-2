import { REFERRERS } from "../data/referrers";
import type { Referrer } from "../types";

/**
 * Data access for the leaderboard. Every function is async so the mock can be
 * swapped for a real endpoint (for example `getReq("leaderboard", params, baseURL)`)
 * without touching the hooks or components that consume it.
 */
const LATENCY_MS = 250;
const wait = () => new Promise((resolve) => setTimeout(resolve, LATENCY_MS));

export const fetchReferrers = async (): Promise<Referrer[]> => {
  await wait();
  return REFERRERS;
};
