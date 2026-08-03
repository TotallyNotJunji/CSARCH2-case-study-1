// Root component orchestrating two simultaneous 8-way BSA runs (LRU and MRU).
// Holds state for config, testCase, addressTrace, lruResult, mruResult, sets, currentStep,
// showFinal, running. Renders ConfigPanel, PlaybackControls, and ComparisonView.
import { useEffect, useState, useMemo } from "react";
import {
  CacheConfig,
  TestCase,
  SimulationResult,
  Set,
  SETSIZE,
  ReplacementPolicy,
} from "./engine/types";
import {
  runSimulation,
  createCache,
  accessAddress,
  LRUPolicy,
  MRUPolicy,
  ReplacementPolicy
} from "./engine/cacheSimulator";
import {
  generateSequential,
  generateMidRepeatReverse,
  generateRandom,
} from "./engine/sequences";
import ConfigPanel from "./components/ConfigPanel";
import ComparisonView from "./components/ComparisonView";
import PlaybackControls from "./components/PlaybackControls";

function computeSetsAtStep(
  trace: number[],
  config: CacheConfig,
  policy: ReplacementPolicy,
  step: number
): Set[] {
  const cache = createCache(config);
  for (let i = 0; i < step && i < trace.length; i++) {
    accessAddress(cache, trace[i], i + 1, config, policy);
  }
  return cache;
}

export default function App() {

  const [config, setConfig] = useState<CacheConfig>({
    blockSize: 2,
    blockCount: 5,
    setCount: 2,
    ways: SETSIZE,
    readPolicy: "load-through",
    replacementPolicy: "LRU",
    hitTime: 1,
    missPenalty: 10,
  });

  const [testCase, setTestCase] = useState<TestCase>("sequential");

  const [currentStep, setCurrentStep] = useState(0);
  const [running, setRunning] = useState(false);
  const [showFinal, setShowFinal] = useState(false);

  const trace = useMemo(() => {
    switch (testCase) {
      case "mid-repeat-reverse":
        return generateMidRepeatReverse(config.blockCount);
      case "random":
        return generateRandom(42);
      case "sequential":
      default:
        return generateSequential(config.blockCount);
    }
  }, [testCase, config.blockCount]);

  const totalSteps = trace.length;
  const activeStep = showFinal ? totalSteps : currentStep;

  

  return (
    <h1 className="flex w-screen h-screen justify-center items-center text-3xl font-bold text-black">
      <ConfigPanel />
    </h1>
  );
}
