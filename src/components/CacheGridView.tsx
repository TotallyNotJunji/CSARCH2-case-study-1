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
  ways = 8,
  policy,
  highlightSetIndex,
}: CacheGridViewProps) {

  return (
    <div>

    </div>
  );
}