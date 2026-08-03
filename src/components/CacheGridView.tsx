// Renders a grid of cache sets (rows) × ways (columns), each cell showing the tag
// or "—" if invalid. Colour-codes by lastUsed to visualise LRU/MRU ordering.
// Driven by Set[] and ways props.

import { ReplacementPolicy, Set } from "../engine/types";

interface CacheGridViewProps {
  sets: Set[];
  ways?: number;
  policy?: ReplacementPolicy;
  highlightSetIndex?: number;
}

export default function CacheGridView({
  sets,
  ways,
  policy,
  highlightSetIndex,
}: CacheGridViewProps) {
  
  // find the target index
  // each s has 8 cache lines
  const getTargetIdx = (set: Set) => {
    const validCacheLines = set.lines
      .map((line, idx) => ({line, idx}))
      .filter((item) => item.line.valid);

    if(validCacheLines.length === 0) return -1;

    if(policy === "LRU") {
      // goes thru each valid cache line to find best minimum value then 
      // get index
      let index = validCacheLines.reduce((min, curr) =>
        // if lastUsed is less than (less recent), keep
        curr.line.lastUsed < min.line.lastUsed ? curr : min
      ).idx
      return index
    }
    else if(policy === "MRU") {
      // goes thru each valid cache line to find best minimum value then 
      // get index
      let index = validCacheLines.reduce((min, curr) =>
        // if lastUsed is more than (mor recent), keep
        curr.line.lastUsed > min.line.lastUsed ? curr : min
      ).idx
      return index
    }
  }
  return (
    <div>

    </div>
  );
}