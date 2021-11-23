import * as React from 'react'
import './WearablePreview.css'

export type WearablePreviewProps = {
  contractAddress: string
  tokenId?: string
  itemId?: string
}

export class WearablePreview extends React.PureComponent<WearablePreviewProps> {
  static baseUrl = 'https://wearable-preview.decentraland.org'
  render() {
    const { contractAddress, tokenId, itemId } = this.props
    const contract = `?contract=${contractAddress}`
    const token = tokenId ? `&token=${tokenId}` : ''
    const item = itemId ? `&item=${itemId}` : ''
    const url = WearablePreview.baseUrl + contract + token + item
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
