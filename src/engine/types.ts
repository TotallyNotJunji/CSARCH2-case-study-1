export type ReadPolicy = 'load-through' | 'non-load-through'

export type ReplacementPolicy = 'LRU' | 'MRU'

export type TestCase = 'sequential' | 'mid-repeat-reverse' | 'random'

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

export interface CacheLine {
  tag: number | null
  valid: boolean
  dirty: boolean
  lastUsed: number
}

export interface Set {
  lines: CacheLine[]
}

export interface TraceEntry {
  address: number
  tag: number
  setIndex: number
  hit: boolean
  evictedAddress?: number
  cycle: number
}

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

export interface SimulationResult {
  config: CacheConfig
  trace: TraceEntry[]
  stats: Stats
}
