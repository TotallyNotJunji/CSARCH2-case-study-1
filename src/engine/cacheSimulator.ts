// Core 8-way BSA simulation engine. Exports: createCache (initialise empty sets/lines),
// accessAddress (compute tag/setIndex, check hit/miss, apply LRU or MRU replacement,
// handle load-through vs non-load-through), runSimulation (iterate address trace through cache,
// collect TraceEntry[], produce SimulationResult), findReplacementIndex (LRU = min lastUsed,
// MRU = max lastUsed).
