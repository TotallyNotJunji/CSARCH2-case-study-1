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

  const lruResult: SimulationResult = useMemo(() => runSimulation(trace, {
    ...config,
    replacementPolicy: "LRU"
  }, new LRUPolicy()
  ), [trace, config]
  );
  const mruResult: SimulationResult = useMemo(() => runSimulation(trace, {
    ...config,
    replacementPolicy: "MRU"
  }, new MRUPolicy()
  ), [trace, config]
  );

  const lruSets: Set[] = useMemo(() => computeSetsAtStep(trace, {
    ...config,
    replacementPolicy: "LRU"
  }, new LRUPolicy(), activeStep
  ), [trace, config, activeStep]
  );

  const mruSets: Set[] = useMemo(() => computeSetsAtStep(trace, {
    ...config,
    replacementPolicy: "MRU"
  }, new MRUPolicy(), activeStep
  ), [trace, config, activeStep]
  );

  useEffect(() => {
    if (!running) return;

    if (currentStep >= totalSteps) {
      setRunning(false);
      return;
    }

    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev + 1 >= totalSteps) {
          setRunning(false);
          return totalSteps;
        }
        return prev + 1;
      });
    }, 500);

    return () => clearInterval(timer);
  }, [running, currentStep, totalSteps]);

  const handleConfigChange = (newConfig: CacheConfig, newTestCase: TestCase) => {
    setRunning(false);
    setShowFinal(false);
    setCurrentStep(0);
    setConfig(newConfig);
    setTestCase(newTestCase);
  };

  const handlePlayPause = () => {
    if (currentStep >= totalSteps) setCurrentStep(0);
    setShowFinal(false);
    setRunning((prev)=> !prev);
  }

  const handleReset = () => {
    setRunning(false);
    setShowFinal(false);
    setCurrentStep(0);
  }

  const handleToggleShowFinal = () => {
    setRunning(false);
    setShowFinal((prev)=>!prev);
  }

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
    setRunning(false);
  }

  return (
    <div className="min-h-screen justify-center bg-neutral-100 p-6 flex flex-col xl:flex-row gap-6">
      <div>
        <div className="max-w-xl mx-auto w-full">
          <ConfigPanel 
            config={config} 
            testCase="sequential" 
            onConfigChange={handleConfigChange}
          />
          <PlaybackControls
            currentStep={currentStep}
            totalSteps={totalSteps}
            running={running}
            showFinal={showFinal}
            onPlayPause={handlePlayPause}
            onReset={handleReset}
            onToggleShowFinal={handleToggleShowFinal}
            onStepChange={handleStepChange}
          />
        </div>
      </div>

      <div>
        <div className="max-w-7xl mx-auto w-full">
          <ComparisonView
            lruResult={lruResult}
            mruResult={mruResult}
            lruSets={lruSets}
            mruSets={mruSets}
            currentStep={activeStep}
          />
        </div>
      </div>
    </div>
  );
}