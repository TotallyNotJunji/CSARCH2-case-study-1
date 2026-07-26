/** Test Case A — Sequential.
 *  Generate addresses 0 .. 2n-1 (where n = config.blockCount),
 *  then repeat the whole sequence a second time.
 *  Result: [0,1,...,2n-1, 0,1,...,2n-1], i.e. 4n total accesses.
 *
 *  Example (n=4): 0,1,2,3,4,5,6,7, 0,1,2,3,4,5,6,7 */
export function generateSequential(count: number, base: number = 0): number[] {
  /* TODO:
     1. n = count (this is the total block count).
     2. Build first pass: [base, base+1, ..., base+2n-1].
     3. Repeat that exact list a second time.
     4. Return the concatenated array. */
  throw new Error('Not implemented')
}

/** Test Case B — Mid-repeat blocks, then reverse.
 *  Start at block 0 to n-1, then repeat the sequence up to 2n-1 twice.
 *  Afterward, reverse the sequence pattern.
 *
 *  Example (n=4):
 *    0,1,2,3,                    ← first pass (0..n-1)
 *    0,1,2,3,4,5,6,7,           ← second pass (0..2n-1)
 *    0,1,2,3,4,5,6,7,           ← third pass (0..2n-1 again)
 *    3,2,1,0,                    ← reverse first half (n-1..0)
 *    7,6,5,4,3,2,1,0,           ← reverse full (2n-1..0)
 *    7,6,5,4,3,2,1,0            ← reverse full again
 *
 *  Total length = n + 2*(2n) + n + 2*(2n) = 10n accesses. */
export function generateMidRepeatReverse(count: number): number[] {
  /* TODO:
     1. n = count.
     2. Build the forward segments and the reverse segments as described.
     3. Concatenate them in order and return. */
  throw new Error('Not implemented')
}

/** Test Case C — Random.
 *  Generate `count` (default 64) random block addresses in the range [0, 1023].
 *  Must be deterministic when a seed is provided (for reproducible results). */
export function generateRandom(count: number, seed?: number): number[] {
  /* TODO:
     1. If seed is given, initialise a simple PRNG (e.g. a linear congruential generator).
     2. Generate `count` integers, each taken modulo 1024 so they are valid block indices.
     3. Return the array. */
  throw new Error('Not implemented')
}
