import { useState } from 'react'
import type { CacheConfig, TestCase, SimulationResult, Set } from './engine/types'
import ConfigPanel from './components/ConfigPanel'
import CacheGridView from './components/CacheGridView'
import StatsPanel from './components/StatsPanel'
import TraceLog from './components/TraceLog'
import PlaybackControls from './components/PlaybackControls'
import ComparisonView from './components/ComparisonView'

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
      <ConfigPanel
        config={config}
        onChange={() => {}}
        testCase={testCase}
        onTestCaseChange={() => {}}
      />
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
      <CacheGridView sets={sets} ways={config.ways} />
      <StatsPanel stats={null} />
      <TraceLog trace={trace} currentStep={currentStep} />
      <ComparisonView lruResult={lruResult} mruResult={mruResult} />
    </div>
  )
}
