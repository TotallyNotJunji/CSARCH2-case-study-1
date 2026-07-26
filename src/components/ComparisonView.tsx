import type { SimulationResult } from '../engine/types'

interface ComparisonViewProps {
  lruResult: SimulationResult | null
  mruResult: SimulationResult | null
}

/** Side-by-side comparison of two simulation runs:
 *    - Left column: 8-way BSA + LRU
 *    - Right column: 8-way BSA + MRU
 *
 *  Each column shows:
 *    - The CacheGridView for that run
 *    - The StatsPanel for that run
 *    - The TraceLog for that run
 *
 *  If only one result is present, the other side shows a placeholder.
 *  The playback controls (step/scrub) should drive both sides simultaneously
 *  so the user can compare behaviour at the same access step. */
export default function ComparisonView({ lruResult, mruResult }: ComparisonViewProps) {
  /* TODO:
     Render two panels side by side (flexbox or CSS grid).
     Each panel embeds CacheGridView, StatsPanel, and TraceLog
     bound to the respective result.
     If a result is null, show "Run LRU simulation" / "Run MRU simulation" prompt. */
  return <div>{/* ComparisonView — LRU vs MRU side by side */}</div>
}
