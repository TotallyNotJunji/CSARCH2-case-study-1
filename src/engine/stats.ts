import type { Stats, TraceEntry, CacheConfig } from './types'

export function computeStats(trace: TraceEntry[], config: CacheConfig): Stats {
  // TODO: aggregate hits/misses, compute rates, AMAT, total access time
  throw new Error('Not implemented')
}
