/* eslint-disable  @typescript-eslint/no-empty-function */
import * as React from 'react'
import './WearablePreview.css'

type WearablePreviewProps = {
  contractAddress?: string
  tokenId?: string
  itemId?: string
  profile?: string
  urns?: string[]
  skin?: string
  hair?: string
  eyes?: string
  emote?: `idle` | `clap` | `dab` | `dance` | `fashion` | `love` | `money`
  bodyShape?: 'male' | 'female'
  zoom?: number
  camera?: 'static' | 'interactive'
  dev?: boolean
  baseUrl?: string
  onLoad?: () => void
  onError?: (error: Error) => void
}

export class WearablePreview extends React.PureComponent<WearablePreviewProps> {
  static defaultProps = {
    dev: false,
    baseUrl: 'https://wearable-preview.decentraland.org',
    onLoad: () => {},
    onError: () => {}
  }

  iframe: HTMLIFrameElement | null = null

  getUrl = () => {
    const {
      contractAddress,
      tokenId,
      itemId,
      profile,
      urns,
      skin,
      hair,
      eyes,
      bodyShape,
      emote,
      zoom,
      camera,
      dev,
      baseUrl
    } = this.props

    const contractParam = contractAddress ? `contract=${contractAddress}` : ''
    const tokenParam = tokenId ? `token=${tokenId}` : ''
    const itemParam = itemId ? `item=${itemId}` : ''
    const profileParam = profile ? `profile=${profile}` : ''
    const urnParams =
      urns && urns.length > 0 ? urns.map((urn) => `urn=${urn}`).join('&') : ''
    const skinParam = skin ? `skin=${skin}` : ''
    const hairParam = hair ? `hair=${hair}` : ''
    const eyesParam = eyes ? `eyes=${eyes}` : ''
    const bodyShapeParam = bodyShape ? `bodyShape=${bodyShape}` : ''
    const emoteParam = emote ? `emote=${emote}` : ''
    const zoomParam = zoom ? `zoom=${zoom}` : ''
    const cameraParam = camera ? `camera=${camera}` : ''
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
        envParam,
        skinParam,
        hairParam,
        eyesParam,
        bodyShapeParam,
        emoteParam,
        zoomParam,
        cameraParam
      ]
        .filter((param) => !!param)
        .join('&')

    return url
  }

  handleMessage = (msgEvent: MessageEvent<string>) => {
    const { baseUrl, onLoad, onError } = this.props
    const { origin } = msgEvent
    if (origin === baseUrl) {
      let event = null
      try {
        event = JSON.parse(
          msgEvent.data || (msgEvent as { message?: string }).message
        )
      } catch (error) {
        console.error('Could not parse message event', msgEvent)
        onError(new Error('Could not parse message event'))
      }
      if (event) {
        switch (event.type) {
          case 'load': {
            onLoad()
            break
          }
          case 'error': {
            onError(new Error(event.message))
          }
        }
      }
    }
  }

  componentDidMount() {
    window.addEventListener('message', this.handleMessage, false)
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.handleMessage, false)
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
        className="WearablePreview"
        src={this.getUrl()}
        width="100%"
        height="100%"
        frameBorder="0"
        ref={this.refIframe}
      ></iframe>
    )
  }
}
