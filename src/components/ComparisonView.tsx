// Side-by-side wrapper: left column shows the LRU SimulationResult (cache grid, stats, trace),
// right column shows the MRU result. Driven by lruResult and mruResult props.
import { SimulationResult, Set } from "../engine/types";

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
    <div>

    </div>
  );
}