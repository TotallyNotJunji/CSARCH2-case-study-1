// Aggregates TraceEntry[] into Stats: totalAccesses, hits, misses, hitRate, missRate,
// totalHitTime (hits × hitTime), totalAccessTime, AMAT (hitRate × hitTime + missRate × missPenalty).
//
//   non-load-through: 1τ(check) + 20τ(transfer 2-word block) + 1τ(cache read) = 22τ
//                    = 2*hitTime + blockSize*memoryAccessTime  (hitTime=1, blockSize=2, memoryAccessTime=10)
//   load-through:      1τ(check) + 10τ(forward single word)   = 11τ
//                    = hitTime + memoryAccessTime
//
// AMAT formula verified against the lecture's own worked examples, e.g.
// "Average access time = 0.25*1ns + 0.75*22ns = 16.75ns" (Direct Mapping, Slide 10)
// and "0.33*1ns + 0.67*22ns = 15.00ns" (Full Associative LRU, Slide 16) — both are
// hitRate*hitTime + missRate*missPenalty, NOT hitTime + missRate*missPenalty.
//
// totalAccessTime formula verified against the SAME two worked examples' literal
// "Total access time" lines:
//   Direct Mapping:  3*2*1ns + 9*2*11ns + 9*1ns = 213ns  (hits=3, misses=9, blockSize=2, hitTime=1, memoryAccessTime=10)
//   Full Assoc LRU:  4*2*1ns + 8*2*11ns + 8*1ns = 192ns  (hits=4, misses=8, blockSize=2, hitTime=1, memoryAccessTime=10)
// which generalizes to (non-load-through):
//   totalAccessTime = hits*blockSize*hitTime + misses*blockSize*(memoryAccessTime+hitTime) + misses*hitTime
// For load-through, the sir rog only show a single-access illustration, no full
// worked sequence example to verify against, so this case is an extrapolation
// of the same structure:
//   totalAccessTime = hits*blockSize*hitTime + misses*(memoryAccessTime+hitTime)

import { TraceEntry, Stats, CacheConfig } from "./types";

// Computes the miss penalty from the underlying timing parameters instead of
// taking it as a raw input — matches the lecture's derivation exactly.
// Only needs these 4 fields, so callers (like ConfigPanel, before a full
// CacheConfig exists) don't need to fake the rest of the shape.
export function computeMissPenalty(
  params: Pick<CacheConfig, "blockSize" | "hitTime" | "memoryAccessTime" | "readPolicy">,
): number {
  const { blockSize, hitTime, memoryAccessTime, readPolicy } = params;
  return readPolicy === "non-load-through"
    ? 2 * hitTime + blockSize * memoryAccessTime
    : hitTime + memoryAccessTime;
}

export function computeStats(trace: TraceEntry[], config: CacheConfig): Stats {
  const totalAccesses = trace.length;
  const hits = trace.filter((entry) => entry.hit).length;
  const misses = totalAccesses - hits;

  const hitRate = totalAccesses > 0 ? hits / totalAccesses : 0;
  const missRate = totalAccesses > 0 ? misses / totalAccesses : 0;

  const totalHitTime = hits * config.hitTime;

  const { blockSize, hitTime, memoryAccessTime } = config;
  const missPenalty = computeMissPenalty(config);

  let totalAccessTime: number;
  if (config.readPolicy === "non-load-through") {
    totalAccessTime =
      hits * blockSize * hitTime +
      misses * blockSize * (memoryAccessTime + hitTime) +
      misses * hitTime;
  } else {
    // load-through: critical word forwarded immediately, so the miss cost is
    totalAccessTime =
      hits * blockSize * hitTime + misses * (memoryAccessTime + hitTime);
  }

  const amat = hitRate * config.hitTime + missRate * missPenalty;

  const stats: Stats = {
    totalAccesses,
    hits,
    misses,
    hitRate,
    missRate,
    totalHitTime,
    totalAccessTime,
    amat,
  };

  return stats;
}