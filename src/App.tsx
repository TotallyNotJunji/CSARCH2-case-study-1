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
} from "./engine/cacheSimulator";
import {
  generateSequential,
  generateMidRepeatReverse,
  generateRandom,
} from "./engine/sequences";
import ConfigPanel from "./components/ConfigPanel";
import ComparisonView from "./components/ComparisonView";
import PlaybackControls from "./components/PlaybackControls";


export default function App() {
  return (
    <h1 className="flex w-screen h-screen justify-center items-center text-3xl font-bold text-black">
      <ConfigPanel />
    </h1>
  );
}
