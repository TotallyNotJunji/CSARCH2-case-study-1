// Renders a grid of cache sets (rows) × ways (columns), each cell showing the tag
// or "—" if invalid. Colour-codes by lastUsed to visualise LRU/MRU ordering.
// Driven by Set[] and ways props.

import { ReplacementPolicy, Set } from "../engine/types";

interface CacheGridViewProps {
  sets: Set[];
  blocks?: number;
  policy?: ReplacementPolicy;
  highlightSetIndex?: number;
}

export default function CacheGridView({
  sets,
  blocks = 8,
  policy,
  highlightSetIndex,
}: CacheGridViewProps) {

  // find the target index
  // each s has 8 cache lines
  const getTargetIdx = (set: Set) => {
    const validCacheBlocks = set.lines
      .map((line, idx) => ({ line, idx }))
      .filter((item) => item.line.valid);

    if (validCacheBlocks.length === 0) return -1;

    if (policy === "LRU") {
      // goes thru each valid cache line to find best minimum value then 
      // get index
      let index = validCacheBlocks.reduce((min, curr) =>
        // if lastUsed is less than (less recent), keep
        curr.line.lastUsed < min.line.lastUsed ? curr : min
      ).idx
      return index
    }
    else if (policy === "MRU") {
      // goes thru each valid cache line to find best minimum value then 
      // get index
      let index = validCacheBlocks.reduce((min, curr) =>
        // if lastUsed is more than (mor recent), keep
        curr.line.lastUsed > min.line.lastUsed ? curr : min
      ).idx
      return index
    }
  }
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-neutral p-6 text-xs w-full">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b pb-2">
        <h3 className="font-bold text-sm"> Policy: {policy} - Current Cache Mapping</h3>
        <div className="flex gap-3 text-xs">
          <span className="flex items-center gap-1">
            <span
              className={`h-2.5 w-2.5 border inline-block ${policy === "LRU"
                  ? "bg-amber-200 border-amber-400"
                  : "bg-emerald-200 border-emerald-400"
                }`}
            ></span>
            {policy === "LRU" ? "LRU Target" : "MRU Target"}
          </span>
          {/* <span className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 bg-white border inline-block"></span>
            Valid Line
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 bg-neutral-400 border inline-block"></span>
            Invalid Line
          </span> */}
        </div>
      </div>
      {/* Table Cells */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-center">
          <thead>
            <tr className="bg-neutral-100 font-medium">
              <th className="py-2 px-1 border w-16">Set</th>
              {Array.from({ length: blocks ?? 0 }).map((_, i) => (
                <th
                  key={i}
                  className="py-2 px-1 border min-w-[55px]"
                >Block {i}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {sets.map((set, setIndex) => {
              const targetIndex = getTargetIdx(set);
              // not sure if this is needed pero sige nice to see which set is changing
              const isHighlightedSet = highlightSetIndex === setIndex;

              return (
                <tr key={setIndex} >
                  <td className={`py-2 px-1 border font-bold transition-colors ${isHighlightedSet
                      ? "border-blue-400 text-blue-800 bg-blue-200/80"
                      : "border-neutral-200 text-neutral-700 bg-neutral-50"
                    }`}
                  >
                    Set {setIndex}
                  </td>

                  {Array.from({ length: blocks ?? 0 }).map((_, blockIndex) => {
                    const cacheLine = set.lines[blockIndex];
                    const isTarget = blockIndex === targetIndex && cacheLine?.valid
                    
                    let borderStyle = isHighlightedSet
                      ? "border-blue-300"
                      : "border-neutral-200";
                    let bgStyle = isHighlightedSet
                      ? "bg-blue-50/60 text-neutral-500"
                      : "bg-neutral-50/50 text-neutral-400";
                    
                    if (cacheLine?.valid) {
                      if (isTarget) {
                        bgStyle =
                          policy === "LRU"
                            ? "bg-amber-100/90 text-amber-900 font-semibold"
                            : "bg-emerald-100/90 text-emerald-900 font-semibold";
                        borderStyle =
                          policy === "LRU" ? "border-amber-400" : "border-emerald-400";
                      } else {
                        bgStyle = isHighlightedSet
                          ? "bg-blue-100/40 text-neutral-800"
                          : "bg-white text-neutral-800";
                      }
                    }
                    return (
                      <td key={blockIndex}
                        className={`py-1.5 px-1 border transition-colors ${borderStyle} ${bgStyle}`}
                      >
                        <div className="flex flex-col items-center">
                          <span className="font-semibold">
                            {cacheLine?.valid ? `Mem:${cacheLine.memBlockNumber ?? "-"}` : "-"}
                          </span>
                          <div className="flex items-center gap-1 ">
                            {cacheLine?.valid && (
                              <span className="opacity-75">t={cacheLine.lastUsed}</span>
                            )}
                          </div>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}