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

  handleAnimationLoop = () => {
    this.setState({ frame: 0 })
  }

  handleAnimationEnd = async () => {
    const { frame, length } = this.state
    this.setState({
      isPlaying: false,
      frame: frame >= Math.floor(length * 100) ? 0 : frame // using to Fixed(1)
    })
  }

  handleAnimationPause = () => {
    this.setState({ isPlaying: false })
  }

  handleAnimationPlay = async () => {
    const { length: stateLength } = this.state
    let emoteLength = stateLength
    if (!stateLength) {
      emoteLength = await this.previewController.emote.getLength()
    }

    this.setState({ isPlaying: true, length: emoteLength })
  }

  handleAnimationPlaying = async (data) => {
    if (await this.previewController.emote.isPlaying()) {
      this.setState({ frame: Math.ceil((data ?? 0) * 100) })
    }
  }

  async componentDidMount(): Promise<void> {
    const { wearablePreviewController } = this.props

    const previewController =
      wearablePreviewController ??
      WearablePreview.createController(this.props.wearablePreviewId)

    previewController.emote.events.on(
      PreviewEmoteEventType.ANIMATION_PLAY,
      this.handleAnimationPlay
    )

    previewController.emote.events.on(
      PreviewEmoteEventType.ANIMATION_PLAYING,
      this.handleAnimationPlaying
    )

    previewController.emote.events.on(
      PreviewEmoteEventType.ANIMATION_END,
      this.handleAnimationEnd
    )

    previewController.emote.events.on(
      PreviewEmoteEventType.ANIMATION_PAUSE,
      this.handleAnimationPause
    )

    previewController.emote.events.on(
      PreviewEmoteEventType.ANIMATION_LOOP,
      this.handleAnimationLoop
    )

    this.previewController = previewController
  }

  handlePlayPause = async () => {
    const { isPlaying } = this.state
    if (isPlaying) {
      await this.previewController?.emote.pause()
    } else {
      await this.previewController?.emote.play()
    }
  }

  handleFrameChange = async (value: number) => {
    if (isNaN(value)) {
      return
    }
    let targetValue = value
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
        {!hideProgressInput ? (
          <input
            type="range"
            value={frame}
            max={Math.ceil((length ?? 0) * 100)}
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
