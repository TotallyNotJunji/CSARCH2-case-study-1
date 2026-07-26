interface PlaybackControlsProps {
  running: boolean
  currentStep: number
  totalSteps: number
  showFinal: boolean
  onPlay: () => void
  onPause: () => void
  onStep: () => void
  onReset: () => void
  onScrub: (step: number) => void
  onToggleFinal: () => void
}

/** Controls for navigating the simulation trace.
 *
 *  - Play / Pause button: toggles auto-advancing through the trace at a fixed interval.
 *  - Step button: advance one access at a time.
 *  - Reset button: go back to step 0 (empty cache).
 *  - Scrubber / slider: jump to any step in the trace (range 0 … totalSteps).
 *  - Toggle: switch between step-by-step animated view and final memory snapshot.
 *    When `showFinal` is true, the CacheGridView and StatsPanel show only the
 *    post-simulation state; when false, they update incrementally. */
export default function PlaybackControls(_props: PlaybackControlsProps) {
  /* TODO:
     Render buttons for play/pause/step/reset.
     Render an <input type="range"> for scrubbing.
     Render a checkbox or toggle for showFinal.
     Wire all the callbacks. */
  return <div>{/* PlaybackControls — play, step, scrubber, final-state toggle */}</div>
}
