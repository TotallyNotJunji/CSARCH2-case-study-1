import type { Stats } from '../engine/types'

interface StatsPanelProps {
  stats: Stats | null
}

export default function StatsPanel({ stats }: StatsPanelProps) {
  // TODO: display hit rate, miss rate, AMAT, total access time
  return <div>{/* StatsPanel */}</div>
}
