/* eslint-disable  @typescript-eslint/no-empty-function */
import * as React from 'react'
import equal from 'deep-equal'
import {
  PreviewCamera,
  PreviewEmote,
  PreviewOptions,
  PreviewMessageType,
  PreviewMessagePayload,
  PreviewProjection,
  sendMessage,
  WearableWithBlobs
} from '@dcl/schemas/dist/dapps/preview'
import { BodyShape } from '@dcl/schemas'
import { createDebounce } from '../../lib/debounce'
import { createController } from './WearablePreview.controller'
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
  blob?: WearableWithBlobs
  skin?: string
  hair?: string
  eyes?: string
  emote?: PreviewEmote
  bodyShape?: BodyShape
  camera?: PreviewCamera
  projection?: PreviewProjection
  zoom?: number
  background?: string
  offsetX?: number
  offsetY?: number
  offsetZ?: number
  cameraX?: number
  cameraY?: number
  cameraZ?: number
  wheelZoom?: number
  wheelPrecision?: number
  wheelStart?: number
  disableBackground?: boolean
  disableAutoRotate?: boolean
  disableAutoCenter?: boolean
  disableFace?: boolean
  disableDefaultWearables?: boolean
  disableDefaultEmotes?: boolean
  disableFadeEffect?: boolean
  dev?: boolean
  baseUrl?: string
  peerUrl?: string
  nftServerUrl?: string
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
    onError: () => {},
    onUpdate: () => {}
  }

  static createController(id: string) {
    return createController(id)
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
      projection,
      zoom,
      background,
      offsetX,
      offsetY,
      offsetZ,
      cameraX,
      cameraY,
      cameraZ,
      wheelZoom,
      wheelPrecision,
      wheelStart,
      disableBackground,
      disableAutoRotate,
      disableAutoCenter,
      disableFace,
      disableDefaultWearables,
      disableDefaultEmotes,
      disableFadeEffect,
      dev,
      baseUrl,
      peerUrl,
      nftServerUrl
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
    const projectionParam = projection ? `projection=${projection}` : ''
    const zoomParam = !isNaN(zoom) ? `zoom=${zoom}` : ''
    const backgroundParam = background ? `background=${background}` : ''
    const offsetXParam = !isNaN(offsetX) ? `offsetX=${offsetX}` : ''
    const offsetYParam = !isNaN(offsetY) ? `offsetY=${offsetY}` : ''
    const offsetZParam = !isNaN(offsetZ) ? `offsetZ=${offsetZ}` : ''
    const cameraXParam = !isNaN(cameraX) ? `cameraX=${cameraX}` : ''
    const cameraYParam = !isNaN(cameraY) ? `cameraY=${cameraY}` : ''
    const cameraZParam = !isNaN(cameraZ) ? `cameraZ=${cameraZ}` : ''
    const wheelZoomParam = !isNaN(wheelZoom) ? `wheelZoom=${wheelZoom}` : ''
    const wheelPrecisionParam = !isNaN(wheelPrecision)
      ? `wheelPrecision=${wheelPrecision}`
      : ''
    const wheelStartParam = !isNaN(wheelStart) ? `wheelStart=${wheelStart}` : ''
    const disableBackgroundParam = disableBackground ? `disableBackground` : ''
    const disableAutoRotateParam = disableAutoRotate ? `disableAutoRotate` : ''
    const disableAutoCenterParam = disableAutoCenter ? `disableAutoCenter` : ''
    const disableFaceParam = disableFace ? `disableFace` : ''
    const disableDefaultWearablesParam = disableDefaultWearables
      ? `disableDefaultWearables`
      : ''
    const disableDefaultEmotesParam = disableDefaultEmotes
      ? `disableDefaultEmotes`
      : ''
    const disableFadeEffectParam = disableFadeEffect ? `disableFadeEffect` : ''
    const peerUrlParam = peerUrl ? `peerUrl=${peerUrl}` : ''
    const nftServerUrlParam = nftServerUrl ? `nftServerUrl=${nftServerUrl}` : ''
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
        projectionParam,
        zoomParam,
        backgroundParam,
        offsetXParam,
        offsetYParam,
        offsetZParam,
        cameraXParam,
        cameraYParam,
        cameraZParam,
        wheelZoomParam,
        wheelPrecisionParam,
        wheelStartParam,
        disableBackgroundParam,
        disableAutoRotateParam,
        disableAutoCenterParam,
        disableFaceParam,
        disableDefaultWearablesParam,
        disableDefaultEmotesParam,
        disableFadeEffectParam,
        peerUrlParam,
        nftServerUrlParam,
        envParam
      ]
        .filter((param) => !!param)
        .join('&')
    return url
  }

  getOptions = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { dev, ...rest } = this.props

    const options: PreviewOptions = {}

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
      onUpdate(options)

      // store options on state
      this.setState({ lastOptions: options })
    }
  }

  componentDidMount() {
    window.addEventListener('message', this.handleMessage, false)

    // set url in state
    this.setState({ url: this.getUrl() })

    // if there's a blob in the props, it can't be passed via URL, so we send it via postMessage
    if (this.props.blob) {
      this.handleUpdate()
    }
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.handleMessage, false)
  }

  componentDidUpdate() {
    debounce(this.handleUpdate, 500)
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
        src={this.state.url}
        width="100%"
        height="100%"
        frameBorder="0"
        ref={this.refIframe}
      ></iframe>
    )
  }
}
