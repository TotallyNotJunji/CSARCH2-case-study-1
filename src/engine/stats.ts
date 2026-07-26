import type { Stats, TraceEntry, CacheConfig } from './types'

/** Compute final statistics from a completed trace.
 *
 *  Counters derived directly from TraceEntry[]:
 *    - totalAccesses = trace.length
 *    - hits           = trace.filter(e => e.hit).length
 *    - misses         = totalAccesses - hits
 *
 *  Rates:
 *    - hitRate    = hits / totalAccesses
 *    - missRate   = misses / totalAccesses
 *
 *  Timing (using config.hitTime and config.missPenalty):
 *    - totalHitTime     = hits × config.hitTime
 *    - totalMissPenalty = misses × config.missPenalty
 *    - totalAccessTime  = totalHitTime + totalMissPenalty
 *    - amat             = totalAccessTime / totalAccesses
 *                       = config.hitTime + (missRate × config.missPenalty)
 *
 *  Return a Stats object. */
export function computeStats(trace: TraceEntry[], config: CacheConfig): Stats {
  /* TODO:
     1. Count hits and misses from the trace array.
     2. Compute rates.
     3. Apply the timing formulas.
     4. Return { totalAccesses, hits, misses, hitRate, missRate,
                 totalHitTime, totalMissPenalty, totalAccessTime, amat }. */
  throw new Error('Not implemented')
}
