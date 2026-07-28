// Core 8-way BSA simulation engine. Exports: createCache (initialise empty sets/lines),
// accessAddress (compute tag/setIndex, check hit/miss, apply LRU or MRU replacement,
// handle load-through vs non-load-through), runSimulation (iterate address trace through cache,
// collect TraceEntry[], produce SimulationResult), findReplacementIndex (LRU = min lastUsed,
// MRU = max lastUsed).

import {
  CacheConfig,
  TraceEntry,
  type Set,
} from "./types";

// creates an empty cache set
// params: config - settings of the cache
// return: cacheSets - the cache representation
export function createCache(config: CacheConfig) {
  const cacheSets: Set[] = [];

  for (let i = 0; i < config.setCount; i++) {
    //clear set values
    const tempSet: Set = {
      lines: [],
    };

    //initialize N cache lines for an N-Way BSA
    for (let j = 0; j < config.ways; j++) {
      const cacheLine = {
        tag: null,
        valid: false,
        dirty: false,
        lastUsed: 0,
      };

      tempSet.lines.push(cacheLine);
    }
    cacheSets.push(tempSet);
  }

  return cacheSets;
}

//finds the block index where new data will be inserted
//  params: cache - cache representation,
//          setIndex - index of cache set to be accessed
//          config - settings of the cache
// return: replacementIndex - block index where new data will be inserted
export function findReplacementIndex(
  cache: Set[],
  setIndex: number,
  config: CacheConfig,
) {
  //check for empty spots
  for (let i = 0; i < cache[setIndex].lines.length; i++) {
    if (!cache[setIndex].lines[i].valid) {
      return i;
    }
  }

  let replacementIndex;
  let value =
    config.replacementPolicy == "LRU"
      ? Number.MAX_SAFE_INTEGER
      : Number.MIN_SAFE_INTEGER;
  if (config.replacementPolicy == "LRU") {
    //find least recently used block
    for (let i = 0; i < cache[setIndex].lines.length; i++) {
      if (cache[setIndex].lines[i].lastUsed < value) {
        replacementIndex = i;
        value = cache[setIndex].lines[i].lastUsed;
      }
    }
  } else {
    //find most recently used block
    for (let i = 0; i < cache[setIndex].lines.length; i++) {
      if (cache[setIndex].lines[i].lastUsed > value) {
        replacementIndex = i;
        value = cache[setIndex].lines[i].lastUsed;
      }
    }
  }

  return replacementIndex ?? 0;
}

// function for finding the value of set bits
// params:  blockNumber - number of block in main memory
//          wordSize - number of bits in word portion of address
//          setCount - number of cache sets
// returns: set - value of set portion of address
function findSet(blockNumber: number, wordSize: number, setCount: number) {
  const setSize = Math.log2(setCount);
  const set = (blockNumber >> wordSize) & ((1 << setSize) - 1);
  return set;
}

// function for finding the value of tag bits
// params:  blockNumber - number of block in main memory
//          wordSize - number of bits in word portion of address
//          setSize - number of bits in set portion of address
// returns: tag - value of tag portion of address
function findTag(blockNumber: number, wordSize: number, setSize: number) {
  const tag = blockNumber >> (wordSize + setSize);
  return tag;
}

//  function for accessing one block in cache
//  params: cache - cache representation,
//          blockNumber - number of the main memory block being read to cache line
//          accessNumber - counter representing the number of steps taken during simulation,
//          config - settings of the cache
// return: traceEntry - result of accessing cache
export function accessAddress(
  cache: Set[],
  blockNumber: number,
  accessNumber: number,
  config: CacheConfig,
) {
  // modulo here to find which set we will modify
  const setIndex = blockNumber % cache.length;
  // assuming blockNumber contains the tag and set bits
  // remove the set bits by diving the block number with number of sets
  const tag = Math.floor(blockNumber / config.setCount);

  //check if hit or miss
  for (let i = 0; i < cache[setIndex].lines.length; i++) {
    // hit
    if (cache[setIndex].lines[i].tag == tag && cache[setIndex].lines[i].valid) {
      cache[setIndex].lines[i].lastUsed = accessNumber;

      const traceEntry: TraceEntry = {
        address: blockNumber,
        tag: tag,
        setIndex: setIndex,
        hit: true,
        evictedAddress: undefined,
        cycle: accessNumber,
      };
      return traceEntry;
    }
  }

  //run when miss
  const replacementIndex = findReplacementIndex(cache, setIndex, config);

  //put in new data and evict old data (if needed)
  const isValid = cache[setIndex].lines[replacementIndex].valid;
  const oldTag = isValid
    ? cache[setIndex].lines[replacementIndex].tag!
    : undefined;
  cache[setIndex].lines[replacementIndex].tag = tag;
  cache[setIndex].lines[replacementIndex].valid = true;
  cache[setIndex].lines[replacementIndex].dirty = false;
  cache[setIndex].lines[replacementIndex].lastUsed = accessNumber;

  const traceEntry: TraceEntry = {
    address: blockNumber,
    tag: tag,
    setIndex: setIndex,
    hit: false,
    evictedAddress: oldTag,
    cycle: accessNumber,
  };

  return traceEntry;
}
