import type { SimulationResult, TraceEntry, Stats } from './types'

export function exportTraceAsJson(result: SimulationResult): string {
  // TODO: serialize trace + stats to JSON string
  throw new Error('Not implemented')
}

export function exportTraceAsCsv(trace: TraceEntry[]): string {
  // TODO: convert trace entries to CSV format
  throw new Error('Not implemented')
}

export function exportStatsAsCsv(stats: Stats): string {
  // TODO: convert stats to CSV row
  throw new Error('Not implemented')
}
