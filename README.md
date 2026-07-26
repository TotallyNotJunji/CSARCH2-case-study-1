# CSARCH2 Case Study 1 — Cache Memory Simulator

## Specifications

**Machine 9 — 8-Way Block Set-Associative (BSA) Cache with LRU vs MRU**

This simulator implements two 8-way set-associative caches that differ only in their replacement policy, running identical address traces so the user can compare LRU and MRU behaviour side by side.

### Common Parameters (all test cases)

| Parameter            | Values / Constraints                          |
|----------------------|-----------------------------------------------|
| Block size           | Power of 2, ≥ 2 words                         |
| Number of cache blocks | Power of 2, ≥ 4                             |
| Associativity        | 8 ways (fixed for Machine 9)                  |
| Number of sets       | blockCount / 8                                |
| Main memory          | 1024 blocks fixed                             |
| Read policy          | Load-through **or** Non-load-through          |
| Replacement policy   | LRU **or** MRU (run simultaneously)           |
| Hit time (cycles)    | Parameterised                                 |
| Miss penalty (cycles)| Parameterised                                 |

### Test Cases

Let **n** = total number of cache blocks.

#### A — Sequential
Access addresses 0 through 2n−1 sequentially, then repeat the sequence a second time.
Example (n = 4): `0,1,2,3,4,5,6,7, 0,1,2,3,4,5,6,7`

#### B — Mid-repeat blocks then reverse
1. Forward pass 0 … n−1
2. Forward pass 0 … 2n−1 (twice)
3. Reverse pass n−1 … 0
4. Reverse pass 2n−1 … 0 (twice)
Example (n = 4): `0,1,2,3, 0,1,2,3,4,5,6,7, 0,1,2,3,4,5,6,7, 3,2,1,0, 7,6,5,4,3,2,1,0, 7,6,5,4,3,2,1,0`

#### C — Random
64 pseudo-random block accesses uniformly distributed in [0, 1023].

### Required Outputs

1. Visual snapshot of cache memory state (set/way grid showing tags).
2. Toggle between step-by-step animated trace and final memory snapshot.
3. Text log detailing every cache access (cycle, address, tag, set, hit/miss, eviction).
4. Statistical outputs:
   - Total memory access count
   - Cache hit count
   - Cache miss count
   - Cache hit rate
   - Cache miss rate
   - Average Memory Access Time (AMAT)
   - Total memory access time

## Parameters

(To be filled with values used during testing, e.g. block size, number of blocks, read policy, hit/miss latencies.)

## Test Results

(To be filled with tables/charts for Test Cases A, B, C for both LRU and MRU.)

## Analysis

(To be filled with detailed discussion of hit/miss rate differences per test case, AMAT differences, and explanation of why LRU or MRU performs better given each access pattern.)

## Comparison

(To be filled with a written comparison of 8-way BSA + LRU vs 8-way BSA + MRU, referencing the results from all three test cases.)
