// Scrollable text log of per-access TraceEntry[] rows (cycle, address, tag, set index,
// hit/miss, evicted tag). Shows up to currentStep entries, auto-scrolls, highlights misses.

import { useEffect, useRef, useState } from "react";
import { TraceEntry } from "../engine/types";

/**
 *  - address: the block address accessed
 *  - tag: the tag portion after set-index extraction
 *  - setIndex: the set this address maps to
 *  - hit: whether the access was a cache hit
 *  - evictedAddress: the tag that was evicted (if a miss caused eviction)
 *  - cycle: global step counter at the time of this access
 */
interface TraceLogProps {
  trace: TraceEntry[];
  currentStep: number;
}

export default function TraceLog({ trace, currentStep }: TraceLogProps) {
  const activeRowRef = useRef<HTMLTableRowElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  // slice trace entries to current step only
  const visibleEntries = trace.slice(0, currentStep);

  // auto-scroll to current step
  useEffect(() => {
    if (activeRowRef.current) {
      activeRowRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [currentStep]);

  return (
    <div className="flex flex-col gap-4 bg-white p-4 text-xs w-full">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-between text-left"
      >
        <div className="flex flex-col gap-0.5">
          <h3 className="font-semibold text-sm">Trace Access Log</h3>
          <span className="text-[11px] text-gray-500">
            Step {Math.min(currentStep, trace.length)} / {trace.length}
          </span>
        </div>
        <span>{isOpen ? "^" : "v"}</span>
      </button>
      {/* Header */}
      {/* <div className="flex items-center justify-between pb-2">
        <h3 className="font-semibold text-sm">Trace Access Log</h3>
        <span className="text-[11px] text-gray-400">
          Step {Math.min(currentStep, trace.length)} / {trace.length}
        </span>
      </div> */}

      {/* Scrollable Container */}
      {isOpen && (
        <div className="overflow-y-auto max-h-72">
          <table className="w-full border-collapse text-left text-[11px]">
            <thead className="sticky top-0 z-10 bg-gray-300">
              <tr>
                <th className="py-2 px-3">Cycle</th>
                <th className="py-2 px-3">Address</th>
                <th className="py-2 px-3">Tag</th>
                <th className="py-2 px-3">Set Index</th>
                <th className="py-2 px-3">Hit / Miss</th>
                <th className="py-2 px-3">Evicted Memory Block</th>
              </tr>
            </thead>
            <tbody>
              {visibleEntries.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="py-8 text-center font-sans italic text-neutral-500"
                  >
                    No trace entries to display yet.
                  </td>
                </tr>
              ) : (
                visibleEntries.map((entry, idx) => {
                  const isLatest = idx === visibleEntries.length - 1;
                  const isMiss = !entry.hit;

                  return (
                    <tr
                      key={entry.cycle}
                      ref={isLatest ? activeRowRef : null}
                      className={`border-b border-white transition-colors ${isMiss
                        ? "bg-rose-50/80 font-medium"
                        : "bg-emerald-50/80 font-medium"
                        } ${isLatest ? "ring-3 ring-inset ring-blue-400" : ""}`}
                    >
                      <td className="py-2 px-3 font-semibold">#{entry.cycle}</td>
                      <td className="py-2 px-3 font-semibold">
                        {entry.address}
                      </td>
                      <td className="py-2 px-3">{entry.tag}</td>
                      <td className="py-2 px-3">{entry.setIndex}</td>
                      <td className="py-2 px-3">
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-1 text-[10px] font-semibold ${entry.hit
                            ? "text-emerald-800 px-2.75"
                            : "text-rose-900"
                            }`}
                        >
                          {entry.hit ? "HIT" : "MISS"}
                        </span>
                      </td>
                      <td className="py-2 px-3">
                        {entry.evictedAddress !== undefined ? (
                          <span className="text-rose-800 font-bold italic">
                            Mem:{entry.address}
                          </span>
                        ) : (
                          <span>-</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}