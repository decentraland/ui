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
  WearableWithBlobs,
  EmoteWithBlobs,
  PreviewType,
  PreviewRenderer
} from '@dcl/schemas/dist/dapps/preview'
import { ArmatureId, BodyShape, EmoteClip } from '@dcl/schemas'
import { createDebounce } from '../../lib/debounce'
import { createController } from './WearablePreview.controller'
import './WearablePreview.css'
import { config } from '../../config'

const debounce = createDebounce()

const safeEncodeParam = (key: string, value: unknown): string => {
  if (value === undefined || value === null || value === '') {
    return ''
  }

  // Handle arrays
  if (Array.isArray(value)) {
    return value.length > 0
      ? value
          .map((item) => `${key}=${encodeURIComponent(String(item))}`)
          .join('&')
      : ''
  }

  // Handle all other values (strings, numbers, booleans, objects, etc.)
  return `${key}=${encodeURIComponent(String(value))}`
}

export type PreviewUnityMode =
  | 'authentication'
  | 'builder'
  | 'marketplace'
  | 'profile'
  | 'configurator'

export type WearablePreviewProps = {
  id?: string
  contractAddress?: string
  tokenId?: string
  itemId?: string
  profile?: string
  urns?: string[]
  urls?: string[]
  base64s?: string[]
  blob?: WearableWithBlobs | EmoteWithBlobs
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
  showSceneBoundaries?: boolean
  showThumbnailBoundaries?: boolean
  panning?: boolean
  lockAlpha?: boolean
  lockBeta?: boolean
  lockRadius?: boolean
  dev?: boolean
  baseUrl?: string
  peerUrl?: string
  nftServerUrl?: string
  type?: PreviewType
  unityMode?: PreviewUnityMode
  unity?: boolean
  username?: string
  socialEmote?: Partial<Record<ArmatureId, EmoteClip>> & {
    loop: boolean
    audio?: string
    startAnimation: boolean
  }
  onLoad?: (renderer?: PreviewRenderer) => void
  onError?: (error: Error) => void
  onUpdate?: (options: PreviewOptions) => void
}

type WearablePreviewState = {
  url?: string
  isReady: boolean
  pendingOptions: PreviewOptions | null
  lastOptions: PreviewOptions | null
}

/**
 * @deprecated Should start using the same component migrated to UI2.
 */
export class WearablePreview extends React.PureComponent<WearablePreviewProps> {
  static defaultProps = {
    dev: false,
    baseUrl: config.get('WEARABLE_PREVIEW_URL'),
    unity: false,
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
      showSceneBoundaries,
      showThumbnailBoundaries,
      panning,
      lockAlpha,
      lockBeta,
      lockRadius,
      dev,
      baseUrl,
      peerUrl,
      nftServerUrl,
      type,
      socialEmote,
      unity,
      unityMode
    } = this.props

    const contractParam = safeEncodeParam('contract', contractAddress)
    const tokenParam = safeEncodeParam('token', tokenId)
    const itemParam = safeEncodeParam('item', itemId)
    const profileParam = safeEncodeParam('profile', profile)
    const urnParams = safeEncodeParam('urn', urns)
    const urlsParams = safeEncodeParam('url', urls)
    const base64sParams = safeEncodeParam('base64', base64s)
    const skinParam = safeEncodeParam('skin', skin)
    const hairParam = safeEncodeParam('hair', hair)
    const eyesParam = safeEncodeParam('eyes', eyes)
    const bodyShapeParam = safeEncodeParam('bodyShape', bodyShape)
    const emoteParam = safeEncodeParam('emote', emote)
    const cameraParam = safeEncodeParam('camera', camera)
    const projectionParam = safeEncodeParam('projection', projection)
    const zoomParam = safeEncodeParam('zoom', zoom)
    const backgroundParam = safeEncodeParam('background', background)
    const offsetXParam = safeEncodeParam('offsetX', offsetX)
    const offsetYParam = safeEncodeParam('offsetY', offsetY)
    const offsetZParam = safeEncodeParam('offsetZ', offsetZ)
    const cameraXParam = safeEncodeParam('cameraX', cameraX)
    const cameraYParam = safeEncodeParam('cameraY', cameraY)
    const cameraZParam = safeEncodeParam('cameraZ', cameraZ)
    const wheelZoomParam = safeEncodeParam('wheelZoom', wheelZoom)
    const wheelPrecisionParam = safeEncodeParam(
      'wheelPrecision',
      wheelPrecision
    )
    const wheelStartParam = safeEncodeParam('wheelStart', wheelStart)
    const disableBackgroundParam = safeEncodeParam(
      'disableBackground',
      disableBackground
    )
    const disableAutoRotateParam = safeEncodeParam(
      'disableAutoRotate',
      disableAutoRotate
    )
    const disableAutoCenterParam = safeEncodeParam(
      'disableAutoCenter',
      disableAutoCenter
    )
    const disableFaceParam = safeEncodeParam('disableFace', disableFace)
    const disableDefaultWearablesParam = safeEncodeParam(
      'disableDefaultWearables',
      disableDefaultWearables
    )
    const disableDefaultEmotesParam = safeEncodeParam(
      'disableDefaultEmotes',
      disableDefaultEmotes
    )
    const disableFadeEffectParam = safeEncodeParam(
      'disableFadeEffect',
      disableFadeEffect
    )
    const showSceneBoundariesParam = safeEncodeParam(
      'showSceneBoundaries',
      showSceneBoundaries
    )
    const showThumbnailBoundariesParam = safeEncodeParam(
      'showThumbnailBoundaries',
      showThumbnailBoundaries
    )
    const peerUrlParam = safeEncodeParam('peerUrl', peerUrl)
    const nftServerUrlParam = safeEncodeParam('nftServerUrl', nftServerUrl)
    const typeParam = safeEncodeParam('type', type)
    const panningParam = safeEncodeParam('panning', panning)
    const lockAlphaParam = safeEncodeParam('lockAlpha', lockAlpha)
    const lockBetaParam = safeEncodeParam('lockBeta', lockBeta)
    const lockRadiusParam = safeEncodeParam('lockRadius', lockRadius)
    const envParam = safeEncodeParam('env', dev ? 'dev' : undefined)
    const unityParam = safeEncodeParam('unity', unity)
    const unityModeParam = safeEncodeParam('mode', unityMode)
    const socialEmoteParam = safeEncodeParam('socialEmote', socialEmote)
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
        showSceneBoundariesParam,
        showThumbnailBoundariesParam,
        peerUrlParam,
        nftServerUrlParam,
        typeParam,
        panningParam,
        lockAlphaParam,
        lockBetaParam,
        lockRadiusParam,
        envParam,
        unityParam,
        unityModeParam,
        socialEmoteParam
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
            const payload = event.data
              .payload as PreviewMessagePayload<PreviewMessageType.LOAD>
            onLoad(payload?.renderer)
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
        allow="autoplay"
      ></iframe>
    )
  }
}
