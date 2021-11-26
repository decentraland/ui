/* eslint-disable  @typescript-eslint/no-empty-function */
import * as React from 'react'
import './WearablePreview.css'

type WearablePreviewBaseProps = {
  contractAddress: string
  dev?: boolean
  baseUrl?: string
  onLoad?: () => void
  onError?: (error: Error) => void
}

type WearablePreviewTokenProps = WearablePreviewBaseProps & {
  tokenId: string
  itemId?: never
}

type WearablePreviewItemProps = WearablePreviewBaseProps & {
  tokenId?: never
  itemId: string
}

export type WearablePreviewProps =
  | WearablePreviewTokenProps
  | WearablePreviewItemProps

export class WearablePreview extends React.PureComponent<WearablePreviewProps> {
  static defaultProps = {
    dev: false,
    baseUrl: 'https://wearable-preview.decentraland.org',
    onLoad: () => {},
    onError: () => {}
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
  render() {
    const { contractAddress, tokenId, itemId, dev, baseUrl } = this.props
    const contract = `?contract=${contractAddress}`
    const token = tokenId ? `&token=${tokenId}` : ''
    const item = itemId ? `&item=${itemId}` : ''
    const env = dev ? `&env=dev` : ''
    const url = baseUrl + contract + token + item + env
    return (
      <iframe
        className="WearablePreview"
        src={url}
        width="100%"
        height="100%"
        frameBorder="0"
      ></iframe>
    )
  }
}
