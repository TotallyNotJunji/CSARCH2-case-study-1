import type { Set } from '../engine/types'

interface CacheGridViewProps {
  sets: Set[]
  ways: number
}

/** Visual snapshot of the cache state as a grid.
 *  - Rows = sets (0 .. setCount-1)
 *  - Columns = ways (0 .. ways-1)
 *  - Each cell displays the tag stored in that line, or "—" if invalid.
 *  - Colour or highlight the most-recently-accessed line in each set (for MRU visualisation)
 *    and the least-recently-accessed (for LRU).
 *  - If `showFinal` is true, display the final state after all accesses.
 *    Otherwise, animate through the trace step-by-step (driven by `currentStep`). */
export default function CacheGridView({ sets, ways }: CacheGridViewProps) {
  /* TODO:
     Render a <table> or CSS grid.
     For each set, emit a row of `ways` cells.
     Each cell shows: tag (or "—" if !line.valid), optionally colour-coded by lastUsed. */
  return <div>{/* CacheGridView — set/way grid with tag display */}</div>
}
