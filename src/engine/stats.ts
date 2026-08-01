// Aggregates TraceEntry[] into Stats: totalAccesses, hits, misses, hitRate, missRate,
// totalHitTime (hits × hitTime), totalMissPenalty (misses × missPenalty),
// totalAccessTime, AMAT (hitTime + missRate × missPenalty).
//
// Read-policy note:
// - non-load-through: the CPU pays hitTime on EVERY access (hit or miss), and a miss
//   additionally stalls the full missPenalty on top before the block is usable.
// - load-through: the critical word is forwarded to the CPU as soon as it arrives,
//   so a miss pays missPenalty INSTEAD OF hitTime (no separate hit-time tax on misses).
// AMAT uses the standard hitTime + missRate * missPenalty formula either way; the
// policy difference shows up in totalAccessTime, not in AMAT.

import { TraceEntry, Stats, CacheConfig } from "./types";

export function computeStats(trace: TraceEntry[], config: CacheConfig): Stats {
  const totalAccesses = trace.length;
  const hits = trace.filter((entry) => entry.hit).length;
  const misses = totalAccesses - hits;

  const hitRate = totalAccesses > 0 ? hits / totalAccesses : 0;
  const missRate = totalAccesses > 0 ? misses / totalAccesses : 0;

  const totalHitTime = hits * config.hitTime;
  const totalMissPenalty = misses * config.missPenalty;

  let totalAccessTime: number;
  if (config.readPolicy === "non-load-through") {
    // hitTime paid on every access, plus full missPenalty stacked on top for misses
    totalAccessTime = totalAccesses * config.hitTime + misses * config.missPenalty;
  } else {
    // load-through: hits pay hitTime, misses pay missPenalty instead of hitTime
    totalAccessTime = hits * config.hitTime + misses * config.missPenalty;
  }

  const amat = config.hitTime + missRate * config.missPenalty;

  const stats: Stats = {
    totalAccesses,
    hits,
    misses,
    hitRate,
    missRate,
    totalHitTime,
    totalMissPenalty,
    totalAccessTime,
    amat,
  };

  return stats;
}