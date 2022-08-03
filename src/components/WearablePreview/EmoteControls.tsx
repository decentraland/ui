/* eslint-disable  @typescript-eslint/no-empty-function */
import * as React from 'react'
import { PreviewEmoteEventType } from '@dcl/schemas/dist/dapps/preview/preview-emote-event-type'
import { IPreviewController } from '@dcl/schemas/dist/dapps/preview'
import { Button } from '../Button/Button'
import { Icon, WearablePreview } from '../..'
import './EmoteControls.css'

const ANIMATION_INTERVAL_PERCENTAGE = 0.1

export type EmoteControlsProps = {
  wearablePreviewId: string
  className?: string
  hideFrameInput?: boolean
  hideProgressInput?: boolean
  hidePlayButton?: boolean
}

type EmoteControlsState = {
  frame: number
  isPlaying: boolean
  playingIntervalId?: number
  length?: number
}

export class EmoteControls extends React.PureComponent<
  EmoteControlsProps,
  EmoteControlsState
> {
  mounted = false
  previewController: IPreviewController | undefined
  state: EmoteControlsState = {
    isPlaying: false,
    frame: 0
  }

  async componentDidMount(): Promise<void> {
    this.mounted = true
    const previewController = WearablePreview.createController(
      this.props.wearablePreviewId
    )
    const length = await previewController.emote.getLength()

    previewController.emote.events.on(PreviewEmoteEventType.ANIMATION_END, () =>
      this.setState({ isPlaying: false })
    )

    previewController.emote.events.on(
      PreviewEmoteEventType.ANIMATION_PAUSE,
      () => this.setState({ isPlaying: false })
    )

    previewController.emote.events.on(
      PreviewEmoteEventType.ANIMATION_PLAY,
      () => this.setState({ isPlaying: true })
    )

    this.previewController = previewController
    if (!this.mounted) return

    this.setState({
      length,
      isPlaying: true,
      playingIntervalId: this.trackFrame(length)
    })
  }

  componentDidUpdate(
    _prevProps: EmoteControlsProps,
    prevState: EmoteControlsState
  ) {
    const { isPlaying } = this.state
    if (prevState.isPlaying && !isPlaying) {
      this.clearPlayingInterval()
    }
  }

  componentWillUnmount() {
    this.mounted = false
  }

  trackFrame = (length: number, currentFrame?: number) => {
    const { isPlaying, playingIntervalId } = this.state
    if (isPlaying && playingIntervalId) {
      return
    }

    let counter = currentFrame || 0
    const max = length * 100
    return window.setInterval(() => {
      counter += ANIMATION_INTERVAL_PERCENTAGE * length
      const nextValue = counter >= max ? max : counter
      this.setState({
        frame: nextValue
      })
    }, ANIMATION_INTERVAL_PERCENTAGE * length * 10)
  }

  clearPlayingInterval = () => {
    const { playingIntervalId } = this.state
    if (playingIntervalId) {
      clearInterval(playingIntervalId)
      this.setState({ playingIntervalId: undefined })
    }
  }

  handlePlayPause = async () => {
    const { frame, length, isPlaying } = this.state
    if (isPlaying) {
      await this.previewController?.emote.pause()
    } else {
      await this.previewController?.emote.play()
      const hasEnded = frame === length * 100
      // it's at the end, let's go back to the first frame
      this.setState({
        frame: hasEnded ? 0 : frame,
        playingIntervalId: this.trackFrame(length, hasEnded ? 0 : frame)
      })
    }
  }

  handleFrameChange = async (value: number) => {
    let targetValue = !isNaN(value) ? value : 0
    const { isPlaying, length } = this.state
    if (length * 100 < value) {
      targetValue = length * 100
    }
    this.setState({ frame: targetValue })
    if (isPlaying) {
      await this.previewController?.emote.pause()
    }
    await this.previewController?.emote.goTo(targetValue / 100)
  }

  render() {
    const { className, hideFrameInput, hidePlayButton, hideProgressInput } =
      this.props
    const { frame, isPlaying, length } = this.state

    return (
      <div className={`EmoteControls ${className}`}>
        {hidePlayButton ? null : (
          <Button
            className="zoom-control play-control"
            onClick={this.handlePlayPause}
          >
            <Icon name={isPlaying ? 'pause' : 'play'} />
          </Button>
        )}
        {length && !hideProgressInput ? (
          <input
            type="range"
            value={frame}
            max={length * 100}
            min={0}
            step="1"
            onChange={(e) => this.handleFrameChange(Number(e.target.value))}
          />
        ) : null}
        {hideFrameInput ? null : (
          <div className="frame-control">
            <input
              value={Math.round(frame / 100)}
              onChange={(e) =>
                this.handleFrameChange(Number(e.target.value) * 100)
              }
            ></input>
          </div>
        )}
      </div>
    )
  }
}
