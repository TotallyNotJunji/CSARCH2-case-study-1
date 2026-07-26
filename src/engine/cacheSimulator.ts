import type { CacheConfig, Set, CacheLine, TraceEntry, SimulationResult } from './types'

export function createCache(config: CacheConfig): Set[] {
  // TODO: initialize empty cache sets
  throw new Error('Not implemented')
}

export function accessAddress(
  sets: Set[],
  address: number,
  config: CacheConfig,
  cycle: number,
): TraceEntry {
  // TODO: compute tag/setIndex, check hit/miss, apply replacement policy,
  //       handle load-through vs non-load-through, return TraceEntry
  throw new Error('Not implemented')
}

export function runSimulation(config: CacheConfig, addresses: number[]): SimulationResult {
  // TODO: iterate addresses, collect trace, compute final stats
  throw new Error('Not implemented')
}

function findReplacementIndex(set: Set, config: CacheConfig, cycle: number): number {
  // TODO: return index of line to evict based on LRU or MRU
  throw new Error('Not implemented')
}
