// Side-by-side wrapper: left column shows the LRU SimulationResult (cache grid, stats, trace),
// right column shows the MRU result. Driven by lruResult and mruResult props.
import { SimulationResult, Set } from "../engine/types";
import CacheGridView from "./CacheGridView";
import StatsPanel from "./StatsPanel";
import TraceLog from "./TraceLog";

interface ComparisonViewProps {
  lruResult: SimulationResult | null;
  mruResult: SimulationResult | null;
  lruSets: Set[];
  mruSets: Set[];
  currentStep: number;
}

export default function ComparisonView({
  lruResult,
  mruResult,
  lruSets,
  mruSets,
  currentStep,
}: ComparisonViewProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
      {/* LRU Side */}
      <div className="flex flex-col gap-4 bg-white p-4 rounded-xl border border-white shadow-sm">
        <h2 className="font-bold flex items-center justify-between">
          <span>8-Way BSA — LRU Policy</span>
          {lruResult && (
            <span className="text-xs font-normal">
              Read: {lruResult.config.readPolicy}
            </span>
          )}
        </h2>

        <CacheGridView
          sets={lruSets}
          blocks={lruResult?.config.ways || 8}
          policy="LRU"
          highlightSetIndex={
            currentStep > 0 && lruResult?.trace[currentStep - 1]
              ? lruResult.trace[currentStep - 1].setIndex
              : undefined
          }
        />

        <StatsPanel stats={lruResult?.stats ?? null} />

        <TraceLog
          trace={lruResult?.trace || []}
          currentStep={currentStep}
        />

      </div>

      {/* MRU Side */}
      <div className="flex flex-col gap-4 bg-white p-4 rounded-xl border-white shadow-sm">
        <h2 className="font-bold flex items-center justify-between">
          <span>8-Way BSA — MRU Policy</span>
          {mruResult && (
            <span className="text-xs font-normal">
              Read: {mruResult.config.readPolicy}
            </span>
          )}
        </h2>

        <CacheGridView
          sets={mruSets}
          blocks={mruResult?.config.ways || 8}
          policy="MRU"
          highlightSetIndex={
            currentStep > 0 && mruResult?.trace[currentStep - 1]
              ? mruResult.trace[currentStep - 1].setIndex
              : undefined
          }
        />

        <StatsPanel stats={mruResult?.stats ?? null} />

        <TraceLog
          trace={lruResult?.trace || []}
          currentStep={currentStep}
        />

      </div>
    </div>
  );
}