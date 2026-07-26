import type { SimulationResult } from '../engine/types'

interface ComparisonViewProps {
  lruResult: SimulationResult | null
  mruResult: SimulationResult | null
}

export default function ComparisonView({ lruResult, mruResult }: ComparisonViewProps) {
  // TODO: side-by-side display of LRU vs MRU results
  return <div>{/* ComparisonView */}</div>
}
