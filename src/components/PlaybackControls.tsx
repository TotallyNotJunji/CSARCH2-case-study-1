// Playback navigation: play/pause auto-advance, step forward, reset to step 0,
// scrubber slider (0..totalSteps), toggle between step-by-step and final snapshot view.
interface PlaybackControlsProps {
  currentStep: number; // current frame
  totalSteps: number; // total frames
  running: boolean;
  showFinal: boolean; // final output aka end frame
  onPlayPause: () => void;
  onReset: () => void; // back to start
  onToggleShowFinal: () => void;
  onStepChange: (step: number) => void; // per frame scrubbing
}

export default function PlaybackControls({
  currentStep,
  totalSteps,
  running,
  showFinal,
  onPlayPause,
  onReset,
  onToggleShowFinal,
  onStepChange,
}: PlaybackControlsProps) {
  // check if at end
  const isAtEnd = currentStep >= totalSteps;
  // pause simulation
  const noSimulation = totalSteps === 0;

  return (
    <div className="flex flex-col mx-auto m-4 gap-3 rounded-lg border border-neutral-200 bg-neutral-50 p-6 text-xs w-full shadow-sm">
      {/* Slider */}
      <div className="flex items-center gap-3 pt-1">
        <span className="min-w-[80px]">
          {showFinal ? "Final View" : `Step ${currentStep} / ${totalSteps}`}
        </span>

        <input
          type="range"
          min={0}
          max={totalSteps || 1}
          value={showFinal ? totalSteps : currentStep}
          onChange={(e) => onStepChange(Number(e.target.value))}
          disabled={noSimulation || running || showFinal}
          className="w-full accent-gray-600 cursor-pointer disabled:cursor-not-allowed h-1.5 rounded-xl"
        />

        <span className="text-neutral-500 text-xs min-w-[40px] text-right">
          {noSimulation
            ? "0%"
            : `${Math.round(((showFinal ? totalSteps : currentStep) / totalSteps) * 100)}%`}
        </span>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={onReset}
            disabled={noSimulation || (currentStep === 0 && !running && !showFinal)}
            className="px-3 py-1.5 rounded border border-neutral-300 bg-neutral-50 hover:bg-neutral-100 disabled:opacity-40 disabled:cursor-not-allowed font-medium text-neutral-700 transition"
            title="Reset to Step 0"
          >
            Reset
          </button>

          <button
            onClick={onPlayPause}
            disabled={noSimulation || isAtEnd || showFinal}
            className={`px-4 py-1.5 rounded border font-semibold text-white transition ${running
              ? "bg-amber-500 border-amber-600"
              : "bg-blue-600 border-blue-700 disabled:bg-neutral-300 disabled:border-neutral-300 disabled:cursor-not-allowed"
              }`}
          >
            {running ? "Pause" : "Play"}
          </button>

          <button
            onClick={onToggleShowFinal}
            disabled={noSimulation}
            className={`px-3 py-1.5 rounded border font-semibold transition disabled:opacity-40 disabled:cursor-not-allowed ${showFinal
              ? "bg-indigo-600 border-indigo-700 text-white"
              : "bg-neutral-100 border-neutral-300 text-neutral-700 hover:bg-neutral-200"
              }`}
          >
            {showFinal ? "Final Snapshot" : "Step-by-Step"}
          </button>
        </div>
      </div>
    </div>
  );
}