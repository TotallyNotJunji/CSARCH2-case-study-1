import type { CacheConfig, Set, CacheLine, TraceEntry, SimulationResult } from './types'

/** Initialise a clean cache.
 *  Create `config.setCount` sets, each containing `config.ways` lines.
 *  Every line starts with tag = null, valid = false, dirty = false, lastUsed = 0. */
export function createCache(config: CacheConfig): Set[] {
  /* TODO:
     1. Allocate an array of length config.setCount.
     2. For each set, push an object { lines: CacheLine[] }.
     3. Each line: { tag: null, valid: false, dirty: false, lastUsed: 0 }.
     4. Return the array of sets. */
  throw new Error('Not implemented')
}

/** Process a single memory access.
 *  - Extract the block address (wordAddress / blockSize, integer division).
 *  - Compute setIndex = blockAddress % config.setCount.
 *  - Compute tag = blockAddress / config.setCount (integer division).
 *  - Check whether the tag exists in the target set (valid && tag matches).
 *  - On HIT: update lastUsed to current cycle; return TraceEntry with hit=true.
 *  - On MISS:
 *      a. If there is an invalid (empty) line, place the tag there.
 *      b. Otherwise, use findReplacementIndex() to pick a victim.
 *      c. Record the evicted tag in the TraceEntry.
 *      d. Load the new block.
 *      e. If readPolicy is 'load-through', the CPU receives the word immediately;
 *         if 'non-load-through', the CPU waits for the full block.
 *         (The cycle cost difference is accounted in stats, not in the trace step.)
 *  - Increment lastUsed for the accessed (or newly placed) line. */
export function accessAddress(
  sets: Set[],
  address: number,
  config: CacheConfig,
  cycle: number,
): TraceEntry {
  /* TODO:
     1. blockAddr = Math.floor(address / config.blockSize).
     2. setIndex = blockAddr % config.setCount.
     3. tag = Math.floor(blockAddr / config.setCount).
     4. Look through sets[setIndex].lines for a valid line whose tag matches.
     5. If found → hit. Update its lastUsed = cycle. Return { hit: true, ... }.
     6. If not found → miss.
        a. Find an invalid line (valid === false). If found, use it.
        b. Else call findReplacementIndex(sets[setIndex], config, cycle).
        c. Evict the chosen line; record its tag in evictedAddress.
        d. Set tag, valid = true, lastUsed = cycle on the chosen line.
        e. Return { hit: false, evictedAddress, ... }. */
  throw new Error('Not implemented')
}

/** Run the full simulation.
 *  - Create an empty cache via createCache().
 *  - Iterate over every address in `addresses`; call accessAddress() for each.
 *  - Collect the returned TraceEntry in an array.
 *  - After all accesses, compute Stats via computeStats().
 *  - Return a SimulationResult. */
export function runSimulation(config: CacheConfig, addresses: number[]): SimulationResult {
  /* TODO:
     1. const sets = createCache(config).
     2. For each address with i from 0: entry = accessAddress(sets, addr, config, i); push entry.
     3. const stats = computeStats(trace, config) — imported from stats.ts.
     4. Return { config, trace, stats }. */
  throw new Error('Not implemented')
}

/** Determine which line in a set should be evicted.
 *  - LRU: pick the line with the smallest lastUsed value (oldest access).
 *  - MRU: pick the line with the largest lastUsed value (most recent access). */
function findReplacementIndex(set: Set, config: CacheConfig, cycle: number): number {
  /* TODO:
     1. If config.replacementPolicy === 'LRU':
        - Find the index of the line in set.lines with the minimum lastUsed.
     2. Else (MRU):
        - Find the index of the line with the maximum lastUsed.
     3. Return that index. */
  throw new Error('Not implemented')
}
