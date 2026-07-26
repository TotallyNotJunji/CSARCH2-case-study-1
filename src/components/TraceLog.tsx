import type { TraceEntry } from '../engine/types'

interface TraceLogProps {
  trace: TraceEntry[]
  currentStep: number
}

export default function TraceLog({ trace, currentStep }: TraceLogProps) {
  // TODO: render scrollable step-by-step log of accesses
  return <div>{/* TraceLog */}</div>
}
