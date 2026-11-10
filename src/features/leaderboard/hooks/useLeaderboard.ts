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

  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    fetchReferrers()
      .then((data) => !cancelled && setReferrers(data))
      .catch(() => !cancelled && setError("Could not load the leaderboard."))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  const reload = () => {
    setLoading(true);
    setError(null);
    setReloadKey((key) => key + 1);
  };

  const ranked = useMemo<LeaderboardEntry[]>(
    () => buildLeaderboard(referrers, period, metric),
    [referrers, period, metric],
  );
  const visible = useMemo(() => filterEntries(ranked, query), [ranked, query]);

  return { referrers, ranked, visible, loading, error, period, setPeriod, metric, setMetric, query, setQuery, reload };
};
