// Displays the seven required stats in a table: total accesses, hits, misses,
// hit rate, miss rate, AMAT, total access time. Shows placeholder when stats prop is null.

import { Stats } from "../engine/types";

/** Details
 *  - totalAccesses: number of memory accesses
 *  - hits / misses: raw counts
 *  - hitRate / missRate: fractions (0–1)
 *  - totalHitTime: hits × hitTime
 *  - totalMissPenalty: misses × missPenalty
 *  - totalAccessTime: totalHitTime + totalMissPenalty
 *  - amat: average memory access time = hitTime + (missRate × missPenalty)
 */
interface StatsPanelProps {
  stats: Stats | null;
}

// Displays the seven required stats in a table: total accesses, hits, misses,
// hit rate, miss rate, AMAT, total access time. Shows placeholder when stats prop is null.
export default function StatsPanel({ stats }: StatsPanelProps) {

  return (
    <div>
      
    </div>
  );
}