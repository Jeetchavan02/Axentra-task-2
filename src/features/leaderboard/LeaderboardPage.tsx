import { useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@src/components/ui/tabs";
import HeadingSection from "@src/components/layouts/HeadingSection";
import { useToast } from "@src/context/ToastContext";
import { useLeaderboard } from "./hooks/useLeaderboard";
import { useRewards } from "./hooks/useRewards";
import { getAvailablePoints } from "./services/rewardsService";
import { calculatePoints } from "./utils/points";
import { getTierForPoints } from "./utils/tiers";
import { downloadCsv, entriesToCsv } from "./utils/csv";
import LeaderboardFilters from "./components/LeaderboardFilters";
import LeaderboardTable from "./components/LeaderboardTable";
import Podium from "./components/Podium";
import RedeemDialog from "./components/RedeemDialog";
import RedemptionHistory from "./components/RedemptionHistory";
import RewardsCatalog from "./components/RewardsCatalog";
import StandingCard from "./components/StandingCard";
import SummaryStats from "./components/SummaryStats";
import TierLadder from "./components/TierLadder";
import type { Reward } from "./types";

export default function LeaderboardPage() {
  const { showToast } = useToast();
  const board = useLeaderboard();
  const { rewards, state, redeem, reset } = useRewards();
  const [pickedId, setPickedId] = useState("");
  const [pending, setPending] = useState<Reward | null>(null);

  // Default the "viewing as" referrer to the current leader until the user picks one.
  const selectedId = pickedId || board.ranked[0]?.referrer.id || "";
  const selected = board.referrers.find((r) => r.id === selectedId);
  const lifetimePoints = selected ? calculatePoints(selected.lifetime) : 0;
  const availablePoints = selected ? getAvailablePoints(selected, state) : 0;
  const tier = getTierForPoints(lifetimePoints);
  const rank = board.ranked.find((e) => e.referrer.id === selectedId)?.rank;
  const myRedemptions = useMemo(() => state.redemptions.filter((r) => r.referrerId === selectedId), [state, selectedId]);

  const handleExport = () => {
    downloadCsv(`leaderboard-${board.period}.csv`, entriesToCsv(board.visible));
    showToast("Export ready", `${board.visible.length} referrers exported to CSV.`, "success");
  };

  const handleConfirm = async () => {
    if (!pending || !selected) return;
    const error = await redeem(selected, pending);
    if (error) showToast("Could not redeem", error, "error");
    else showToast("Reward redeemed", `${pending.title} is on its way.`, "success");
    setPending(null);
  };

  const standing = (
    <StandingCard
      referrers={board.referrers}
      selectedId={selectedId}
      onSelectedChange={setPickedId}
      tier={tier}
      lifetimePoints={lifetimePoints}
      availablePoints={availablePoints}
      rank={rank}
    />
  );

  return (
    <div className="axentraos-page-container">
      <HeadingSection
        heading="Leaderboard & Rewards"
        subheading="See who drives the most referrals and redeem points for rewards."
      />

      <main className="flex-1 space-y-6 p-6">
        {board.error ? (
          <p className="py-20 text-center text-red-600">{board.error}</p>
        ) : board.loading ? (
          <p className="py-20 text-center text-gray-500">Loading leaderboard...</p>
        ) : (
          <Tabs defaultValue="leaderboard" className="space-y-6">
            <TabsList>
              <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
              <TabsTrigger value="rewards">Rewards</TabsTrigger>
            </TabsList>

            <TabsContent value="leaderboard" className="space-y-6">
              <LeaderboardFilters
                period={board.period}
                onPeriodChange={board.setPeriod}
                metric={board.metric}
                onMetricChange={board.setMetric}
                query={board.query}
                onQueryChange={board.setQuery}
                onExport={handleExport}
                onRefresh={board.reload}
              />
              <SummaryStats entries={board.ranked} />
              <Podium entries={board.ranked.slice(0, 3)} onSelect={(e) => setPickedId(e.referrer.id)} />
              <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
                <div className="min-w-0">
                  <LeaderboardTable entries={board.visible} selectedId={selectedId} onSelect={(e) => setPickedId(e.referrer.id)} />
                </div>
                <div className="space-y-6">
                  {standing}
                  <TierLadder entries={board.ranked} currentTier={tier.id} />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="rewards">
              <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
                <div className="min-w-0">
                  <RewardsCatalog
                    rewards={rewards}
                    state={state}
                    lifetimePoints={lifetimePoints}
                    availablePoints={availablePoints}
                    onRedeem={setPending}
                  />
                </div>
                <div className="space-y-6">
                  {standing}
                  <RedemptionHistory redemptions={myRedemptions} onReset={reset} />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </main>

      <RedeemDialog reward={pending} balance={availablePoints} onConfirm={handleConfirm} onCancel={() => setPending(null)} />
    </div>
  );
}
