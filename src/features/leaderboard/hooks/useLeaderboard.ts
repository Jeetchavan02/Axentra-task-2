import { useEffect, useMemo, useState } from "react";
import { fetchReferrers } from "../services/leaderboardService";
import { buildLeaderboard, filterEntries } from "../utils/ranking";
import type { LeaderboardEntry, Period, RankMetric, Referrer } from "../types";

export const useLeaderboard = () => {
  const [referrers, setReferrers] = useState<Referrer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [period, setPeriod] = useState<Period>("30d");
  const [metric, setMetric] = useState<RankMetric>("points");
  const [query, setQuery] = useState("");

  const load = () => {
    setLoading(true);
    setError(null);
    fetchReferrers()
      .then(setReferrers)
      .catch(() => setError("Could not load the leaderboard."))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const ranked = useMemo<LeaderboardEntry[]>(
    () => buildLeaderboard(referrers, period, metric),
    [referrers, period, metric],
  );
  const visible = useMemo(() => filterEntries(ranked, query), [ranked, query]);

  return { referrers, ranked, visible, loading, error, period, setPeriod, metric, setMetric, query, setQuery, reload: load };
};
