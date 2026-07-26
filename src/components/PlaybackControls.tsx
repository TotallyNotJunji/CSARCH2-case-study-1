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

export default function PlaybackControls(_props: PlaybackControlsProps) {
  // TODO: render play/pause, step, scrubber, final-state toggle
  return <div>{/* PlaybackControls */}</div>
}
