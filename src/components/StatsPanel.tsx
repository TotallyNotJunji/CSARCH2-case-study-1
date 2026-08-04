// Displays the required stats in a table: total accesses, hits, misses,
// hit rate, miss rate, total access time, AMAT. Shows placeholder when stats prop is null.

import { useState } from "react";
import { Stats } from "../engine/types";

/** Details
 *  - totalAccesses: number of memory accesses
 *  - hits / misses: raw counts
 *  - hitRate / missRate: fractions (0–1)
 *  - totalHitTime: hits × hitTime
 *  - totalAccessTime: slide-accurate word-level total access time
 *  - amat: average memory access time = hitRate×hitTime + missRate×missPenalty
 *    (missPenalty is derived, not stored — see computeMissPenalty in stats.ts)
 */
interface StatsPanelProps {
  stats: Stats | null;
}

export default function StatsPanel({ stats }: StatsPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!stats) {
    return (
      <div className="flex flex-col items-center justify-center p-6 border border-dashed rounded-s bg-white text-xs w-full">
        No statistics available yet. Run or step through the simulation to generate stats.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 bg-white p-4 text-xs w-full">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-between text-left"
      >
        <h3 className="font-semibold text-sm">
          Performance Statistics
        </h3>
        <span>{isOpen ? "^" : "v"}</span>
      </button>

      {isOpen && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs">
          <thead>
            <tr className="bg-gray-300 font-medium">
              <th className="py-2 px-3">Metric</th>
              <th className="py-2 px-3 text-right">Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            <tr>
              <td className="py-2 px-3 font-medium">Total Accesses</td>
              <td className="py-2 px-3 font-normal text-right">
                {stats.totalAccesses}
              </td>
            </tr>
            <tr>
              <td className="py-2 px-3 font-medium">Hits</td>
              <td className="py-2 px-3 font-normal text-right">
                {stats.hits}
              </td>
            </tr>
            <tr>
              <td className="py-2 px-3 font-medium">Misses</td>
              <td className="py-2 px-3 font-normal text-right">
                {stats.misses}
              </td>
            </tr>
            <tr>
              <td className="py-2 px-3 font-medium">Hit Rate</td>
              <td className="py-2 px-3 font-normal text-right">
                {(stats.hitRate * 100).toFixed(2)}%
              </td>
            </tr>
            <tr>
              <td className="py-2 px-3 font-medium">Miss Rate</td>
              <td className="py-2 px-3 font-normal text-right ">
                {(stats.missRate * 100).toFixed(2)}%
              </td>
            </tr>
            <tr>
              <td className="py-2 px-3 font-medium">Total Access Time</td>
              <td className="py-2 px-3 font-normal text-right">
                {stats.totalAccessTime}
              </td>
            </tr>
            <tr>
              <td className="py-2 px-3 font-medium">
                AMAT (Average Memory Access Time)
              </td>
              <td className="py-2 px-3 font-normal text-right">
                {stats.amat.toFixed(2)}
              </td>
            </tr>
          </tbody>
          </table>
        </div>
      )}
    </div>
  );
}