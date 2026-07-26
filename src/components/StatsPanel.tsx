import type { Stats } from '../engine/types'

interface StatsPanelProps {
  stats: Stats | null
}

/** Displays the seven required statistical outputs in a table:
 *  1. Total memory access count
 *  2. Cache hit count
 *  3. Cache miss count
 *  4. Cache hit rate
 *  5. Cache miss rate
 *  6. Average Memory Access Time (AMAT)
 *  7. Total memory access time
 *
 *  Shows "—" or a placeholder when `stats` is null (no simulation run yet). */
export default function StatsPanel({ stats }: StatsPanelProps) {
  /* TODO:
     If stats is null, show a placeholder message.
     Otherwise render a table or list with the seven fields. */
  return <div>{/* StatsPanel — hit rate, miss rate, AMAT, total access time, etc. */}</div>
}
