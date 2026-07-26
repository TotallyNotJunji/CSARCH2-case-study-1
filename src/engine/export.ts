import type { SimulationResult, TraceEntry, Stats } from './types'

/** Serialise the full simulation result (config + trace + stats)
 *  to a JSON string for download or external analysis. */
export function exportTraceAsJson(result: SimulationResult): string {
  /* TODO:
     return JSON.stringify(result, null, 2); */
  throw new Error('Not implemented')
}

/** Convert the per-access trace entries to CSV format.
 *  Headers: cycle,address,tag,setIndex,hit,evictedAddress
 *  One row per trace entry. */
export function exportTraceAsCsv(trace: TraceEntry[]): string {
  /* TODO:
     1. Write a header line.
     2. Map each TraceEntry to a comma-separated row.
     3. Return the full CSV string. */
  throw new Error('Not implemented')
}

/** Convert the aggregated stats to a single CSV row.
 *  Headers: totalAccesses,hits,misses,hitRate,missRate,totalHitTime,
 *           totalMissPenalty,totalAccessTime,amat */
export function exportStatsAsCsv(stats: Stats): string {
  /* TODO:
     1. Write a header line.
     2. Write a data line with the Stats values.
     3. Return the CSV string. */
  throw new Error('Not implemented')
}
