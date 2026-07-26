import { useState } from 'react'
import type { CacheConfig, TestCase, SimulationResult, Set } from './engine/types'
import ConfigPanel from './components/ConfigPanel'
import CacheGridView from './components/CacheGridView'
import StatsPanel from './components/StatsPanel'
import TraceLog from './components/TraceLog'
import PlaybackControls from './components/PlaybackControls'
import ComparisonView from './components/ComparisonView'

/** Default configuration matching the Machine 9 minimum recommendations.
 *  - 8-way set-associative
 *  - 32 sets × 8 ways = 256 cache blocks
 *  - 16-word blocks
 *  - Load-through read policy, LRU replacement */
const defaultConfig: CacheConfig = {
  blockSize: 16,
  blockCount: 256,
  setCount: 32,
  ways: 8,
  readPolicy: 'load-through',
  replacementPolicy: 'LRU',
  hitTime: 1,
  missPenalty: 10,
}

/** Root application component.
 *
 *  Orchestrates two independent simulation runs (one LRU, one MRU)
 *  using the same cache geometry and address trace.
 *
 *  State:
 *    - config: current cache parameters (shared by both runs)
 *    - testCase: which address pattern to generate
 *    - addressTrace: the generated sequence of block addresses
 *    - lruResult / mruResult: SimulationResult after running each policy
 *    - sets: current cache snapshot (for step-by-step playback)
 *    - currentStep: which access we are viewing (0 … trace.length)
 *    - showFinal: whether to show only the final state
 *    - running: whether auto-play is active
 *
 *  Layout:
 *    - ConfigPanel at the top
 *    - PlaybackControls below it
 *    - ComparisonView (two-column) filling the rest of the screen */
export default function App() {
  const [config] = useState<CacheConfig>(defaultConfig)
  const [testCase] = useState<TestCase>('sequential')
  const [sets] = useState<Set[]>([])
  const [trace] = useState<SimulationResult['trace']>([])
  const [currentStep] = useState(0)
  const [lruResult] = useState<SimulationResult | null>(null)
  const [mruResult] = useState<SimulationResult | null>(null)

  return (
    <div>
      <h1>8-Way Set-Associative Cache Simulator (LRU vs MRU)</h1>
      {/* ConfigPanel: parameter controls + test-case selector + run button */}
      <ConfigPanel
        config={config}
        onChange={() => {}}
        testCase={testCase}
        onTestCaseChange={() => {}}
      />
      {/* PlaybackControls: step-by-step / final toggle, play/pause, scrubber */}
      <PlaybackControls
        running={false}
        currentStep={currentStep}
        totalSteps={trace.length}
        showFinal={false}
        onPlay={() => {}}
        onPause={() => {}}
        onStep={() => {}}
        onReset={() => {}}
        onScrub={() => {}}
        onToggleFinal={() => {}}
      />
      {/* ComparisonView: side-by-side LRU (left) vs MRU (right) */}
      <ComparisonView lruResult={lruResult} mruResult={mruResult} />
      {/* Standalone cache grid, stats, and trace log (visible outside comparison view) */}
      <CacheGridView sets={sets} ways={config.ways} />
      <StatsPanel stats={null} />
      <TraceLog trace={trace} currentStep={currentStep} />
    </div>
  )
}
