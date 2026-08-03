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
  if (!stats) {
    return (
      <div className="flex flex-col items-center justify-center p-6 border border-dashed border-neutral-300 rounded-lg bg-white text-neutral-400 text-xs shadow-sm w-full">
        No statistics available yet. Run or step through the simulation to generate stats.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-neutral-200 bg-white p-4 shadow-sm text-xs font-sans w-full">
      <h3 className="font-semibold text-neutral-800 text-sm border-b pb-2">
        Performance Statistics
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-xs">
          <thead>
            <tr className="bg-neutral-100 text-neutral-600 font-medium border-b border-neutral-200">
              <th className="py-2 px-3">Metric</th>
              <th className="py-2 px-3 text-right">Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            <tr>
              <td className="py-2 px-3 text-neutral-600 font-medium">Total Accesses</td>
              <td className="py-2 px-3 font-mono font-semibold text-right text-neutral-900">
                {stats.totalAccesses}
              </td>
            </tr>
            <tr>
              <td className="py-2 px-3 text-neutral-600 font-medium">Hits</td>
              <td className="py-2 px-3 font-mono font-semibold text-right text-emerald-700">
                {stats.hits}
              </td>
            </tr>
            <tr>
              <td className="py-2 px-3 text-neutral-600 font-medium">Misses</td>
              <td className="py-2 px-3 font-mono font-semibold text-right text-rose-700">
                {stats.misses}
              </td>
            </tr>
            <tr>
              <td className="py-2 px-3 text-neutral-600 font-medium">Hit Rate</td>
              <td className="py-2 px-3 font-mono font-semibold text-right text-emerald-700">
                {(stats.hitRate * 100).toFixed(2)}%
              </td>
            </tr>
            <tr>
              <td className="py-2 px-3 text-neutral-600 font-medium">Miss Rate</td>
              <td className="py-2 px-3 font-mono font-semibold text-right text-rose-700">
                {(stats.missRate * 100).toFixed(2)}%
              </td>
            </tr>
            <tr>
              <td className="py-2 px-3 text-neutral-600 font-medium">
                AMAT (Average Memory Access Time)
              </td>
              <td className="py-2 px-3 font-mono font-semibold text-right text-blue-800">
                {stats.amat.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className="py-2 px-3 text-neutral-600 font-medium">Total Access Time</td>
              <td className="py-2 px-3 font-mono font-bold text-right text-neutral-900">
                {stats.totalAccessTime}
              </td>
            </tr>
            <tr>
              <td className="py-2 px-3 text-neutral-600 font-medium">Total Miss Penalty</td>
              <td className="py-2 px-3 font-mono font-bold text-right text-neutral-900">
                {stats.totalMissPenalty}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}