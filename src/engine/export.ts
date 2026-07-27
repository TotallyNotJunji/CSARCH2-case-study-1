// Serialisation utilities: exportTraceAsJson (SimulationResult → JSON string),
// exportTraceAsCsv (TraceEntry[] → CSV with headers cycle,address,tag,setIndex,hit,evictedAddress),
// exportStatsAsCsv (Stats → single CSV row).

import { TraceEntry, Stats } from "./types";

export function exportTraceAsJson(trace: TraceEntry[]): string {
    return JSON.stringify(trace, null, 2);
}

export function exportTraceAsCsv(trace: TraceEntry[]): string {
    const headers = [
        "cycle",
        "address",
        "tag",
        "setIndex",
        "hit",
        "evictedAddress",
    ];
    const rows = trace.map((entry) => [
        entry.cycle,
        entry.address,
        entry.tag,
        entry.setIndex,
        entry.hit ? 1 : 0,
        entry.evictedAddress !== undefined ? entry.evictedAddress : "",
    ]);
    return [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
}

export function exportStatsAsCsv(stats: Stats): string {
    const headers = ["totalAccesses", "hits", "misses", "hitRate", "missRate"];
    const row = [
        stats.totalAccesses,
        stats.hits,
        stats.misses,
        stats.hitRate.toFixed(4),
        stats.missRate.toFixed(4),
    ];
    return [headers.join(","), row.join(",")].join("\n");
}
