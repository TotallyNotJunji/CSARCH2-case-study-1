// Renders cache parameter inputs (block size, block count, set count, read policy,
// hit time, miss penalty) and a test-case selector (sequential / mid-repeat-reverse / random).
// Accepts CacheConfig + TestCase props and calls onChange / onTestCaseChange on edit.
import { useState } from "react";
import { CacheConfig, ReadPolicy, SETSIZE, TestCase } from "../engine/types";

interface ConfigPanelProps {
  config?: CacheConfig;
  testCase?: TestCase;
  onConfigChange: (newConfig: CacheConfig, newTestCase: TestCase) => void;
}

const BLOCKSIZELIMIT = 5;
const BLOCKCOUNTLIMIT = BLOCKSIZELIMIT;

export default function ConfigPanel({ 
  config, 
  testCase: initialTestCase, 
  onConfigChange 
}: ConfigPanelProps) {
  //state constants, accepts props if given
  const [blockSizeExp, setBlockSizeExp] = useState<number>(
    // cache_props?.blockSize ?? 1,
    config?.blockSize ?? 1,
  );
  const [blockCountExp, setBlockCountExp] = useState<number>(
    config?.blockCount ?? 3,
  );
  const [readPolicy, setReadPolicy] = useState<ReadPolicy>(
    config?.readPolicy ?? "load-through",
  );
  const [hitTime, setHitTime] = useState<number>(
    config?.hitTime ?? 0
  );
  const [missPenalty, setMissPenalty] = useState<number>(
    config?.missPenalty ?? 0,
  );
  const [testCase, setTestCase] = useState<TestCase>(
    initialTestCase ?? "sequential"
  );

  //computed constants
  const blockSize = Math.pow(2, blockSizeExp);
  const blockCount = Math.pow(2, blockCountExp);
  const setCount = blockCount / SETSIZE;

  // function for handling the change of blockCount
  // since setCount should not exceed blockCount
  const handleBlockCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newExp = Number(e.target.value);
    setBlockCountExp(newExp);
  };

  //TO-DO: implement this later
  const handleStartSimulation = () => {
    // Placeholder
    console.log("Starting simulation with:", {
      blockSize,
      blockCount,
      setCount,
      readPolicy,
      hitTime,
      missPenalty,
      testCase,
    });
  };

  return (
    <div className="flex mx-auto max-w-xl justify-center items-center rounded-lg border border-neutral-200 bg-neutral-50 p-6 shadow-sm">
      <div className="flex flex-col gap-4 w-full">
        {/* Block size */}
        <div className="flex items-center gap-3">
          <label
            htmlFor="block_size"
            className="w-44 text-sm font-medium text-neutral-700"
          >
            Block size: {blockSize}
          </label>
          <input
            type="range"
            id="block_size"
            min={1}
            max={BLOCKSIZELIMIT}
            step={1}
            value={blockSizeExp}
            onChange={(e) => setBlockSizeExp(Number(e.target.value))}
            className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-neutral-600"
            list="bs_markers"
          />
          <datalist id="bs_markers">
            <option value="2"></option>
            <option value="4"></option>
            <option value="8"></option>
            <option value="16"></option>
            <option value="44"></option>
          </datalist>
        </div>

        {/* Block count */}
        <div className="flex items-center gap-3">
          <label
            htmlFor="block_count"
            className="w-44 text-sm font-medium text-neutral-700"
          >
            Block count: {blockCount}
          </label>
          <input
            type="range"
            id="block_count"
            min={3}
            max={BLOCKCOUNTLIMIT}
            step={1}
            value={blockCountExp}
            onChange={handleBlockCountChange}
            className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-neutral-600"
          />
        </div>

        {/* Set count */}
        <div className="flex items-center gap-3">
          <label
            htmlFor="set_count"
            className="w-44 text-sm font-medium text-neutral-700"
          >
            Set count: {setCount}
          </label>
        </div>

        {/* Read policy */}
        <div className="flex items-start gap-3">
          <label className="w-44 text-sm font-medium text-neutral-700 pt-1.5">
            Read policy:
          </label>
          <div className="w-full flex gap-2">
            <button
              className={
                readPolicy == "load-through"
                  ? "w-full rounded border border-neutral-300 bg-white px-3 py-1.5 text-sm text-black transition bg-yellow-200 hover:bg-yellow-400"
                  : "w-full rounded border border-neutral-300 bg-white px-3 py-1.5 text-sm text-neutral-700 transition hover:bg-neutral-100 hover:text-neutral-500"
              }
              onClick={() => setReadPolicy("load-through")}
            >
              Load Through
            </button>
            <button
              className={
                readPolicy == "non-load-through"
                  ? "w-full rounded border border-neutral-300 bg-white px-3 py-1.5 text-sm text-black transition bg-yellow-200 hover:bg-yellow-400"
                  : "w-full rounded border border-neutral-300 bg-white px-3 py-1.5 text-sm text-neutral-700 transition hover:bg-neutral-100 hover:text-neutral-500"
              }
              onClick={() => setReadPolicy("non-load-through")}
            >
              Non-Load Through
            </button>
          </div>
        </div>

        {/* Hit time */}
        <div className="flex items-center gap-3">
          <label
            htmlFor="hit_time"
            className="w-44 text-sm font-medium text-neutral-700"
          >
            Hit time:
          </label>
          <input
            type="number"
            id="hit_time"
            className="w-full rounded border text-xs border-neutral-300 px-3 py-1.5 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-400"
            onChange={(e) => {
              setHitTime(Number(e.target.value));
            }}
            min={0}
          />
        </div>

        {/* Miss penalty */}
        <div className="flex items-center gap-3">
          <label
            htmlFor="miss_penalty"
            className="w-44 text-sm font-medium text-neutral-700"
          >
            Miss penalty:
          </label>
          <input
            type="number"
            id="miss_penalty"
            className="w-full rounded border text-xs border-neutral-300 px-3 py-1.5 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-400"
            onChange={(e) => setMissPenalty(Number(e.target.value))}
            min={0}
          />
        </div>

        {/* Test case */}
        <div className="flex items-start gap-3">
          <label className="w-44 text-sm font-medium text-neutral-700 pt-1.5">
            Test case:
          </label>
          <div className="w-full flex gap-2">
            <button
              className={
                testCase == "sequential"
                  ? "w-full rounded border border-neutral-300 bg-white px-3 py-1.5 text-sm text-black transition bg-yellow-200 hover:bg-yellow-400"
                  : "w-full rounded border border-neutral-300 bg-white px-3 py-1.5 text-sm text-neutral-700 transition hover:bg-neutral-100 hover:text-neutral-500"
              }
              onClick={() => setTestCase("sequential")}
            >
              Sequential
            </button>
            <button
              className={
                testCase == "mid-repeat-reverse"
                  ? "w-full rounded border border-neutral-300 bg-white px-3 py-1.5 text-sm text-black transition bg-yellow-200 hover:bg-yellow-400"
                  : "w-full rounded border border-neutral-300 bg-white px-3 py-1.5 text-sm text-neutral-700 transition hover:bg-neutral-100 hover:text-neutral-500"
              }
              onClick={() => setTestCase("mid-repeat-reverse")}
            >
              Mid-repeat-reverse
            </button>
            <button
              className={
                testCase == "random"
                  ? "w-full rounded border border-neutral-300 bg-white px-3 py-1.5 text-sm text-black transition bg-yellow-200 hover:bg-yellow-400"
                  : "w-full rounded border border-neutral-300 bg-white px-3 py-1.5 text-sm text-neutral-700 transition hover:bg-neutral-100 hover:text-neutral-500"
              }
              onClick={() => setTestCase("random")}
            >
              Random
            </button>
          </div>
        </div>

        {/* Start Simulation button */}
        <div className="pt-2">
          <button
            onClick={handleStartSimulation}
            className="w-full rounded-md bg-neutral-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700 active:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-400"
          >
            Start Simulation
          </button>
        </div>
      </div>
    </div>
  );
}
