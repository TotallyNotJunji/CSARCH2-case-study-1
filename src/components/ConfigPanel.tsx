import type { CacheConfig, TestCase } from '../engine/types'

interface ConfigPanelProps {
  config: CacheConfig
  onChange: (config: CacheConfig) => void
  testCase: TestCase
  onTestCaseChange: (tc: TestCase) => void
}

/** Renders controls for the user to configure cache parameters and select a test case.
 *
 *  Fields (all driven by the `config` prop, calling `onChange` on edit):
 *    - Block Size (power of 2, ≥ 2 words)
 *    - Number of Cache Blocks (power of 2, ≥ 4)
 *    - Number of Sets (derived from blockCount / ways, or user-specified for BSA)
 *    - Associativity / Ways (fixed at 8 for Machine 9)
 *    - Read Policy (dropdown: load-through / non-load-through)
 *    - Replacement Policy (dropdown: LRU / MRU)
 *    - Hit Time (cycles)
 *    - Miss Penalty (cycles)
 *
 *  Test-case selector (radio or dropdown):
 *    - Sequential
 *    - Mid-repeat-reverse
 *    - Random
 *
 *  The panel should also include a "Run" or "Generate & Run" button. */
export default function ConfigPanel({ config, onChange, testCase, onTestCaseChange }: ConfigPanelProps) {
  /* TODO:
     Render labelled inputs for each CacheConfig field.
     Render a test-case selector.
     Wire onChange handlers that call the prop callbacks. */
  return <div>{/* ConfigPanel — cache parameter + test case + run controls */}</div>
}
