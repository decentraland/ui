/* eslint-disable  @typescript-eslint/no-empty-function */
import * as React from 'react'
import equal from 'deep-equal'
import {
  PreviewCamera,
  PreviewEmote,
  PreviewEnv,
  PreviewOptions,
  PreviewMessageType,
  PreviewMessagePayload,
  sendMessage
} from '@dcl/schemas/dist/dapps/preview'
import { WearableBodyShape } from '@dcl/schemas/dist/platform/wearables'
import { createDebounce } from '../../lib/debounce'
import './WearablePreview.css'

const debounce = createDebounce()

export type WearablePreviewProps = {
  id?: string
  contractAddress?: string
  tokenId?: string
  itemId?: string
  profile?: string
  urns?: string[]
  urls?: string[]
  base64s?: string[]
  skin?: string
  hair?: string
  eyes?: string
  emote?: PreviewEmote
  bodyShape?: WearableBodyShape
  camera?: PreviewCamera
  autoRotateSpeed?: number
  zoom?: number
  offsetX?: number
  offsetY?: number
  offsetZ?: number
  wheelZoom?: number
  wheelPrecision?: number
  wheelStart?: number
  transparentBackground?: boolean
  dev?: boolean
  hotreload?: boolean
  baseUrl?: string
  onLoad?: () => void
  onError?: (error: Error) => void
  onUpdate?: (options: PreviewOptions) => void
}

type WearablePreviewState = {
  url?: string
  isReady: boolean
  pendingOptions: PreviewOptions | null
  lastOptions: PreviewOptions | null
}

export class WearablePreview extends React.PureComponent<WearablePreviewProps> {
  static defaultProps = {
    dev: false,
    baseUrl: 'https://wearable-preview.decentraland.org',
    onLoad: () => {},
    onError: () => {}
  }

  state: WearablePreviewState = {
    isReady: false,
    pendingOptions: null,
    lastOptions: null
  }

  iframe: HTMLIFrameElement | null = null

  getUrl = () => {
    const {
      contractAddress,
      tokenId,
      itemId,
      profile,
      urns,
      urls,
      base64s,
      skin,
      hair,
      eyes,
      bodyShape,
      emote,
      camera,
      zoom,
      autoRotateSpeed,
      offsetX,
      offsetY,
      offsetZ,
      wheelZoom,
      wheelPrecision,
      wheelStart,
      transparentBackground,
      dev,
      baseUrl
    } = this.props

    const contractParam = contractAddress ? `contract=${contractAddress}` : ''
    const tokenParam = tokenId ? `token=${tokenId}` : ''
    const itemParam = itemId ? `item=${itemId}` : ''
    const profileParam = profile ? `profile=${profile}` : ''
    const urnParams =
      urns && urns.length > 0 ? urns.map((urn) => `urn=${urn}`).join('&') : ''
    const urlsParams =
      urls && urls.length > 0 ? urls.map((url) => `url=${url}`).join('&') : ''
    const base64sParams =
      base64s && base64s.length > 0
        ? base64s.map((base64) => `base64=${base64}`).join('&')
        : ''
    const skinParam = skin ? `skin=${skin}` : ''
    const hairParam = hair ? `hair=${hair}` : ''
    const eyesParam = eyes ? `eyes=${eyes}` : ''
    const bodyShapeParam = bodyShape ? `bodyShape=${bodyShape}` : ''
    const emoteParam = emote ? `emote=${emote}` : ''
    const cameraParam = camera ? `camera=${camera}` : ''
    const zoomParam = !isNaN(zoom) ? `zoom=${zoom}` : ''
    const autoRotateSpeedParam = !isNaN(autoRotateSpeed)
      ? `autoRotateSpeed=${autoRotateSpeed}`
      : ''
    const offsetXParam = !isNaN(offsetX) ? `offsetX=${offsetX}` : ''
    const offsetYParam = !isNaN(offsetY) ? `offsetY=${offsetY}` : ''
    const offsetZParam = !isNaN(offsetZ) ? `offsetZ=${offsetZ}` : ''
    const wheelZoomParam = !isNaN(wheelZoom) ? `wheelZoom=${wheelZoom}` : ''
    const wheelPrecisionParam = !isNaN(wheelPrecision)
      ? `wheelPrecision=${wheelPrecision}`
      : ''
    const wheelStartParam = !isNaN(wheelStart) ? `wheelStart=${wheelStart}` : ''
    const transparentBackgroundParam = transparentBackground
      ? `transparentBackground`
      : ''
    const envParam = dev ? `env=dev` : ''
    const url =
      baseUrl +
      '?' +
      [
        contractParam,
        tokenParam,
        itemParam,
        profileParam,
        urnParams,
        urlsParams,
        base64sParams,
        skinParam,
        hairParam,
        eyesParam,
        bodyShapeParam,
        emoteParam,
        cameraParam,
        zoomParam,
        autoRotateSpeedParam,
        offsetXParam,
        offsetYParam,
        offsetZParam,
        wheelZoomParam,
        wheelPrecisionParam,
        wheelStartParam,
        transparentBackgroundParam,
        envParam
      ]
        .filter((param) => !!param)
        .join('&')
    return url
  }

  getOptions = () => {
    const { dev, hotreload, ...rest } = this.props

    if (!hotreload) {
      throw new Error(
        'Should not generate options if hotreload is not turned on'
      )
    }

    const options: PreviewOptions = {
      env: dev ? PreviewEnv.DEV : PreviewEnv.PROD
    }

    for (const key in rest) {
      if (typeof rest[key] !== 'function') {
        options[key] = rest[key]
      }
    }

    return options
  }

  handleMessage = (event: MessageEvent) => {
    const { baseUrl, onLoad, onError } = this.props
    const { origin } = event
    if (origin === baseUrl) {
      if (event.data && event.data.type) {
        const type: PreviewMessageType = event.data.type
        switch (type) {
          case PreviewMessageType.LOAD: {
            onLoad()
            break
          }
          case PreviewMessageType.ERROR: {
            const payload = event.data
              .payload as PreviewMessagePayload<PreviewMessageType.ERROR>
            onError(new Error(payload.message))
            break
          }
          case PreviewMessageType.READY: {
            const { isReady, pendingOptions } = this.state
            // ignore if already flagged as ready
            if (isReady) {
              return
            }
            if (pendingOptions !== null) {
              // if there were pending options, flush them and flag as ready
              this.sendUpdate(pendingOptions)
              this.setState({ isReady: true, pendingOptions: null })
            } else {
              // otherwise just flag as ready
              this.setState({ isReady: true })
            }
            break
          }
          default:
          // do nothing
        }
      }
    }
  }

  handleUpdate = () => {
    if (this.iframe) {
      // SSR check
      if (window) {
        const options = this.getOptions()
        if (this.state.isReady) {
          // if the iframe is ready, send the update
          this.sendUpdate(options)
        } else {
          // otherwise store last update in state until it's ready
          this.setState({ pendingPreviewOptions: options })
        }
      }
    } else {
      console.warn(`Could not send update, iframe is not referenced`)
    }
  }

  sendUpdate = (options: PreviewOptions) => {
    const { lastOptions } = this.state
    // only send update if new options are different
    if (!lastOptions || !equal(options, lastOptions)) {
      // send message to iframe
      sendMessage(this.iframe.contentWindow, PreviewMessageType.UPDATE, {
        options
      })
      // callback
      const { onUpdate } = this.props
      if (onUpdate) {
        onUpdate(options)
      }
      // store options on state
      this.setState({ lastOptions: options })
    }
  }

  componentDidMount() {
    window.addEventListener('message', this.handleMessage, false)
    this.setState({ url: this.getUrl() })
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.handleMessage, false)
  }

  componentDidUpdate() {
    if (this.props.hotreload) {
      debounce(this.handleUpdate, 500)
    }
  }

  refIframe = (iframe: HTMLIFrameElement | null) => {
    this.iframe = iframe
  }

  render() {
    if (this.props.tokenId && this.props.itemId) {
      console.warn(
        'You should NOT use `tokenId` and `itemId` props simultaneously'
      )
    }

    return (
      <iframe
        id={this.props.id}
        className="WearablePreview"
        src={this.props.hotreload ? this.state.url : this.getUrl()}
        width="100%"
        height="100%"
        frameBorder="0"
        ref={this.refIframe}
      ></iframe>
    )
  }
}
