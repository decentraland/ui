/* eslint-disable  @typescript-eslint/no-empty-function */
import * as React from 'react'
import { PreviewEmoteEventType } from '@dcl/schemas/dist/dapps/preview/preview-emote-event-type'
import { IPreviewController } from '@dcl/schemas/dist/dapps/preview'
import { Button } from '../Button/Button'
import { Icon, WearablePreview } from '../..'
import './EmoteControls.css'

export type EmoteControlsProps = {
  wearablePreviewId: string
  className?: string
  hideFrameInput?: boolean
  hideProgressInput?: boolean
  hidePlayButton?: boolean
  wearablePreviewController?: IPreviewController
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
  previewController: IPreviewController | undefined
  state: EmoteControlsState = {
    isPlaying: false,
    frame: 0
  }

  handleAnimationEnd = () => {
    this.setState({ isPlaying: false })
  }

  handleAnimationPause = () => {
    this.setState({ isPlaying: false })
  }

  handleAnimationPlay = async () => {
    const { frame } = this.state
    const length = await this.previewController.emote.getLength()
    const intervalId = this.trackFrame(
      length,
      frame < length * 100 ? frame : undefined
    )
    this.setState((prevState) => ({
      isPlaying: true,
      length,
      frame: prevState.frame === length * 100 ? 0 : prevState.frame,
      playingIntervalId: intervalId
    }))
  }

  async componentDidMount(): Promise<void> {
    const { wearablePreviewController } = this.props

    const previewController =
      wearablePreviewController ??
      WearablePreview.createController(this.props.wearablePreviewId)

    previewController.emote.events.on(
      PreviewEmoteEventType.ANIMATION_END,
      this.handleAnimationEnd
    )

    previewController.emote.events.on(
      PreviewEmoteEventType.ANIMATION_PAUSE,
      this.handleAnimationPause
    )

    previewController.emote.events.on(
      PreviewEmoteEventType.ANIMATION_PLAY,
      this.handleAnimationPlay
    )

    this.previewController = previewController
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

  trackFrame = (length: number, currentFrame?: number) => {
    const { playingIntervalId } = this.state
    if (playingIntervalId) {
      clearInterval(playingIntervalId)
    }

    const max = length * 100
    const intervalWindow = 100
    const interval = (length / (length / (intervalWindow / 1000))) * 100
    let counter = currentFrame || interval
    return window.setInterval(() => {
      counter += interval
      const nextValue = counter >= max ? max : counter
      if (nextValue >= max) {
        this.clearPlayingInterval()
      }
      this.setState({
        frame: nextValue
      })
    }, intervalWindow)
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
        frame: hasEnded ? 0 : frame
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
