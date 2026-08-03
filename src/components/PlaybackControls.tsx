// Playback navigation: play/pause auto-advance, step forward, reset to step 0,
// scrubber slider (0..totalSteps), toggle between step-by-step and final snapshot view.


export default function PlaybackControls() {

  return (
    <div className="flex flex-col mx-auto m-4 gap-3 rounded-lg border border-neutral-200 bg-neutral-50 p-6 text-xs w-full shadow-sm">
      {/* Scrubber Slider */}
      <div className="flex items-center gap-3 pt-1">
        <span className="min-w-[80px]">
          Step 1/n
        </span>

        <input
          type="range"
          min={0}
          max={1}
          value={-1}
          className="w-full accent-gray-600 cursor-pointer disabled:cursor-not-allowed h-1.5 rounded-xl"
        />

      </div>
      {/* Top Bar: Action Buttons & Mode Toggle */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <div className="flex items-center gap-2">
          {/* Reset */}
          <button
            // onClick={}
            // disabled={}
            className="px-3 py-1.5 rounded border border-neutral-300 bg-neutral-50 hover:bg-neutral-100 disabled:opacity-40 disabled:cursor-not-allowed font-medium text-neutral-700 transition"
            title="Reset to Step 0"
          >
            Reset
          </button>

          {/* Play / Pause */}
          <button
            // onClick={}
            // disabled={}
            className={`px-4 py-1.5 rounded border font-semibold text-black transition`}
          >
            Play
          </button>

          {/* View Mode Toggle */}
          <button
            // onClick={}
            // disabled={}
            className={`px-3 py-1.5 rounded border font-semibold transition disabled:opacity-40 disabled:cursor-not-allowed`}
          >
            Final
          </button>
        </div>
      </div>
    </div>
  );
}