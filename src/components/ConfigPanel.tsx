import type { CacheConfig, TestCase } from '../engine/types'

interface ConfigPanelProps {
  config: CacheConfig
  onChange: (config: CacheConfig) => void
  testCase: TestCase
  onTestCaseChange: (tc: TestCase) => void
}

export default function ConfigPanel({ config, onChange, testCase, onTestCaseChange }: ConfigPanelProps) {
  // TODO: render parameter inputs and test case selector
  return <div>{/* ConfigPanel */}</div>
}
