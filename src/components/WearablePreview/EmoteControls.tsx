/* eslint-disable  @typescript-eslint/no-empty-function */
import * as React from 'react'
import classNames from 'classnames'
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
  hideSoundButton?: boolean
  wearablePreviewController?: IPreviewController
  renderPlayButton?: (props: {
    isPlaying: boolean
    onPlay: () => Promise<void>
    onPause: () => Promise<void>
    onToggle: () => Promise<void>
  }) => React.ReactNode
  renderSoundButton?: (props: {
    isSoundEnabled: boolean
    hasSound: boolean
    onToggle: () => void
  }) => React.ReactNode
  renderProgressBar?: (props: {
    frame: number
    length: number
    onChange: (value: number) => Promise<void>
    onMouseUp: () => Promise<void>
  }) => React.ReactNode
  renderFrameInput?: (props: {
    frame: number
    onChange: (value: number) => Promise<void>
  }) => React.ReactNode
}

type EmoteControlsState = {
  frame: number
  isPlaying: boolean
  playingIntervalId?: number
  length?: number
  isSoundEnabled: boolean
  hasSound: boolean
  shouldResumePlaying: boolean
  isChangingFrame: boolean
}

export class EmoteControls extends React.PureComponent<
  EmoteControlsProps,
  EmoteControlsState
> {
  previewController: IPreviewController | undefined
  state: EmoteControlsState = {
    isPlaying: false,
    frame: 0,
    isSoundEnabled: false,
    hasSound: undefined,
    shouldResumePlaying: false,
    isChangingFrame: false
  }

  handleAnimationLoop = () => {
    this.setState({ frame: 0 })
  }

  handleAnimationEnd = () => {
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
    const { length: stateLength, isChangingFrame } = this.state
    let emoteLength = stateLength
    if (!stateLength) {
      emoteLength = await this.previewController.emote.getLength()
    }
    if (!isChangingFrame) {
      this.setState({ isPlaying: true, length: emoteLength })
    }
  }

  handleAnimationPlaying = ({ length }) => {
    this.setState({ frame: Math.ceil((length ?? 0) * 100) })
  }

  componentDidMount(): void {
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

  handlePlay = async () => {
    await this.previewController?.emote.play()
  }

  handlePause = async () => {
    await this.previewController?.emote.pause()
  }

  handlePlayPause = async () => {
    const { isPlaying } = this.state
    if (isPlaying) {
      await this.handlePause()
    } else {
      await this.handlePlay()
    }
  }

  handleSoundToggle = () => {
    const { isSoundEnabled } = this.state
    if (isSoundEnabled) {
      this.previewController?.emote.disableSound()
    } else {
      this.previewController?.emote.enableSound()
    }
    this.setState({ isSoundEnabled: !isSoundEnabled })
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
    this.setState({ frame: targetValue, isChangingFrame: true })
    if (isPlaying) {
      await this.previewController?.emote.pause()
      this.setState({ shouldResumePlaying: true })
    }
    await this.previewController?.emote.goTo(targetValue / 100)
  }

  handleMouseUp = async () => {
    const { shouldResumePlaying } = this.state
    this.setState({ isChangingFrame: false })
    if (shouldResumePlaying) {
      await this.previewController?.emote.play()
      this.setState({ shouldResumePlaying: false })
    }
  }

  async componentDidUpdate() {
    if (this.state.hasSound === undefined) {
      this.previewController.emote
        .hasSound()
        .then((hasSound) => this.setState({ hasSound }))
    }
  }

  render() {
    const {
      className,
      hideFrameInput,
      hidePlayButton,
      hideSoundButton,
      hideProgressInput,
      renderPlayButton,
      renderSoundButton,
      renderProgressBar,
      renderFrameInput
    } = this.props
    const { frame, isPlaying, length, hasSound, isSoundEnabled } = this.state

    return (
      <div className={`EmoteControls ${className}`}>
        {hidePlayButton ? null : renderPlayButton ? (
          renderPlayButton({
            isPlaying,
            onPlay: this.handlePlay,
            onPause: this.handlePause,
            onToggle: this.handlePlayPause
          })
        ) : (
          <Button className="play-control" onClick={this.handlePlayPause}>
            <Icon name={isPlaying ? 'pause' : 'play'} />
          </Button>
        )}

        {!hideProgressInput ? (
          renderProgressBar ? (
            renderProgressBar({
              frame,
              length: length ?? 0,
              onChange: this.handleFrameChange,
              onMouseUp: this.handleMouseUp
            })
          ) : (
            <input
              type="range"
              value={frame}
              max={Math.ceil((length ?? 0) * 100)}
              min={0}
              step="1"
              onChange={(e) => this.handleFrameChange(Number(e.target.value))}
              onMouseUp={this.handleMouseUp}
            />
          )
        ) : null}

        {hideFrameInput ? null : (
          <div className="frame-control">
            {renderFrameInput ? (
              renderFrameInput({
                frame: Math.round(frame / 100),
                onChange: (value) => this.handleFrameChange(value * 100)
              })
            ) : (
              <input
                value={Math.round(frame / 100)}
                onChange={(e) =>
                  this.handleFrameChange(Number(e.target.value) * 100)
                }
              />
            )}
          </div>
        )}

        {hideSoundButton || !hasSound ? null : renderSoundButton ? (
          renderSoundButton({
            isSoundEnabled,
            hasSound,
            onToggle: this.handleSoundToggle
          })
        ) : (
          <Button
            className={classNames('sound-control', {
              ['muted']: !isSoundEnabled
            })}
            onClick={this.handleSoundToggle}
          />
        )}
      </div>
    )
  }
}
