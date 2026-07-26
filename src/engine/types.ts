/** Whether the missed word is streamed to the CPU immediately (load-through)
 *  or only after the entire block is fetched (non-load-through). */
export type ReadPolicy = 'load-through' | 'non-load-through'

/** Which block is evicted on a miss: LRU evicts the least-recently-used,
 *  MRU evicts the most-recently-used. */
export type ReplacementPolicy = 'LRU' | 'MRU'

/** The three test-case patterns defined in the specification. */
export type TestCase = 'sequential' | 'mid-repeat-reverse' | 'random'

/** User-configurable cache parameters.
 *  - blockSize: words per block (power of 2, min 2)
 *  - blockCount: total cache blocks (power of 2, min 4)
 *  - setCount: number of sets in the N-way BSA
 *  - ways: associativity (8 for Machine 9)
 *  - readPolicy: load-through or non-load-through
 *  - replacementPolicy: LRU or MRU
 *  - hitTime: cycles for a cache hit
 *  - missPenalty: additional cycles for a cache miss */
export interface CacheConfig {
  blockSize: number
  blockCount: number
  setCount: number
  ways: number
  readPolicy: ReadPolicy
  replacementPolicy: ReplacementPolicy
  hitTime: number
  missPenalty: number
}

/** A single cache line (one "way" within a set).
 *  - tag: the block address tag (null if empty)
 *  - valid: whether the line holds valid data
 *  - dirty: whether the line has been written to (unused in read-only traces but included for completeness)
 *  - lastUsed: incrementing timestamp used to determine LRU/MRU order */
export interface CacheLine {
  tag: number | null
  valid: boolean
  dirty: boolean
  lastUsed: number
}

/** A cache set containing `ways` lines.
 *  For an 8-way BSA, each set has exactly 8 lines. */
export interface Set {
  lines: CacheLine[]
}

/** One recorded access in the trace log.
 *  - address: the block address accessed
 *  - tag: the tag portion after set-index extraction
 *  - setIndex: the set this address maps to
 *  - hit: whether the access was a cache hit
 *  - evictedAddress: the tag that was evicted (if a miss caused eviction)
 *  - cycle: global step counter at the time of this access */
export interface TraceEntry {
  address: number
  tag: number
  setIndex: number
  hit: boolean
  evictedAddress?: number
  cycle: number
}

/** Aggregated statistics for one simulation run.
 *  - totalAccesses: number of memory accesses
 *  - hits / misses: raw counts
 *  - hitRate / missRate: fractions (0–1)
 *  - totalHitTime: hits × hitTime
 *  - totalMissPenalty: misses × missPenalty
 *  - totalAccessTime: totalHitTime + totalMissPenalty
 *  - amat: average memory access time = hitTime + (missRate × missPenalty) */
export interface Stats {
  totalAccesses: number
  hits: number
  misses: number
  hitRate: number
  missRate: number
  totalHitTime: number
  totalMissPenalty: number
  totalAccessTime: number
  amat: number
}

/** Complete output of one simulation run, bundling the configuration,
 *  the per-access trace log, and the final computed statistics. */
export interface SimulationResult {
  config: CacheConfig
  trace: TraceEntry[]
  stats: Stats
}
