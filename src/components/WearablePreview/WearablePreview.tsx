import * as React from 'react'
import './WearablePreview.css'

type WearablePreviewBaseProps = {
  contractAddress: string
  dev?: boolean
  onLoad?: () => void
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
  static baseUrl = 'https://wearable-preview.decentraland.org'
  handleMessage = (event: MessageEvent<string>) => {
    const { onLoad } = this.props
    const { origin } = event
    if (origin === WearablePreview.baseUrl && onLoad) {
      onLoad()
    }
  }
  componentDidMount() {
    window.addEventListener('message', this.handleMessage, false)
  }
  componentWillUnmount() {
    window.removeEventListener('message', this.handleMessage, false)
  }
  render() {
    const { contractAddress, tokenId, itemId, dev } = this.props
    const contract = `?contract=${contractAddress}`
    const token = tokenId ? `&token=${tokenId}` : ''
    const item = itemId ? `&item=${itemId}` : ''
    const env = dev ? `&env=dev` : ''
    const url = WearablePreview.baseUrl + contract + token + item + env
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
