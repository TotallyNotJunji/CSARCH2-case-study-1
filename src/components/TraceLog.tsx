import type { TraceEntry } from '../engine/types'

interface TraceLogProps {
  trace: TraceEntry[]
  currentStep: number
}

/** Scrollable text log of every cache access.
 *  - Each row: cycle number, address, tag, set index, hit/miss,
 *    evicted tag (if any).
 *  - Rows up to `currentStep` are visible when not showing the final state.
 *  - Auto-scrolls to the latest entry.
 *  - Highlight misses in a different colour from hits. */
export default function TraceLog({ trace, currentStep }: TraceLogProps) {
  /* TODO:
     Render a <div> with overflow-y: auto.
     Map trace.slice(0, currentStep) to line elements.
     Style hit/miss entries differently. */
  return <div>{/* TraceLog — scrollable step-by-step text log */}</div>
}
