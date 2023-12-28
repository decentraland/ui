import React from 'react'
import {
  BodyShape,
  EmoteCategory,
  NFT,
  NFTCategory,
  Network,
  Rarity,
  WearableCategory
} from '@dcl/schemas'
import { RenderResult, render } from '@testing-library/react'
import { NFTCard } from './NFTCard'
import { Props } from './NFTCard.types'

function renderNFTCard(props: Partial<Props>) {
  return render(<NFTCard nft={{} as NFT} {...props} />)
}

let screen: RenderResult

describe('when rendering an ens', () => {
  let ensNFT: NFT

  beforeEach(() => {
    ensNFT = {
      id: 'id',
      category: NFTCategory.ENS,
      network: Network.ETHEREUM,
      data: {
        ens: {
          subdomain: 'subdomain'
        }
      }
    } as NFT
    screen = renderNFTCard({ nft: ensNFT })
  })

  it('should render the subdomain', () => {
    expect(screen.getByText(ensNFT.data.ens.subdomain)).toBeInTheDocument()
  })

  it('should render the network', () => {
    expect(screen.getByText('Ethereum')).toBeInTheDocument()
  })
})

describe('when rendering a parcel', () => {
  let parcelNFT: NFT

  beforeEach(() => {
    parcelNFT = {
      id: 'id',
      category: NFTCategory.PARCEL,
      network: Network.ETHEREUM,
      data: {
        parcel: {
          x: '1',
          y: '2'
        }
      }
    } as NFT
    screen = renderNFTCard({ nft: parcelNFT })
  })

  it('should render the parcel position', () => {
    expect(screen.getByText('1,2')).toBeInTheDocument()
  })
})

describe('when rendering an estate', () => {
  let estateNFT: NFT

  beforeEach(() => {
    estateNFT = {
      id: 'id',
      category: NFTCategory.ESTATE,
      network: Network.ETHEREUM,
      data: {
        estate: {
          parcels: [
            { x: 1, y: 2 },
            { x: 1, y: 1 }
          ]
        }
      }
    } as NFT
    screen = renderNFTCard({ nft: estateNFT })
  })

  it('should render the amount of parcels', () => {
    expect(screen.getByText('2 LAND')).toBeInTheDocument()
  })
})

describe('when rendering a wearable', () => {
  let wearableNFT: NFT

  beforeEach(() => {
    wearableNFT = {
      id: 'id',
      name: 'wearable name',
      category: NFTCategory.WEARABLE,
      network: Network.ETHEREUM,
      owner: '0x1231123',
      data: {
        wearable: {
          category: WearableCategory.EYES,
          bodyShapes: [BodyShape.FEMALE],
          isSmart: true,
          rarity: Rarity.COMMON
        }
      }
    } as NFT

    screen = renderNFTCard({ nft: wearableNFT })
  })

  it('should render the wearable name', () => {
    expect(screen.getByText(wearableNFT.name)).toBeInTheDocument()
  })

  it('should render the trimmed wearable owner', () => {
    expect(screen.getByText('0x1231')).toBeInTheDocument()
  })

  it('should render the rarity tag', () => {
    expect(screen.getByText(Rarity.COMMON)).toBeInTheDocument()
  })

  it('should render the smart tag', () => {
    expect(screen.getByLabelText('Smart')).toBeInTheDocument()
  })
})

describe('when rendering an emote', () => {
  let emoteNFT: NFT

  beforeEach(() => {
    emoteNFT = {
      id: 'id',
      name: 'emote name',
      category: NFTCategory.EMOTE,
      network: Network.ETHEREUM,
      owner: '0x1231123',
      data: {
        emote: {
          loop: true,
          hasSound: true,
          rarity: Rarity.COMMON,
          category: EmoteCategory.FUN
        }
      }
    } as NFT

    screen = renderNFTCard({ nft: emoteNFT })
  })

  it('should render the rarity tag', () => {
    expect(screen.getByText(Rarity.COMMON)).toBeInTheDocument()
  })
})

describe('when a price is defined', () => {
  let emoteNFT: NFT

  beforeEach(() => {
    emoteNFT = {
      id: 'id',
      name: 'emote name',
      category: NFTCategory.EMOTE,
      network: Network.ETHEREUM,
      owner: '0x1231123',
      data: {
        emote: {
          loop: true,
          hasSound: true,
          rarity: Rarity.COMMON,
          category: EmoteCategory.FUN
        }
      }
    } as NFT

    screen = renderNFTCard({ nft: emoteNFT, price: '12' })
  })

  it('should render the price in MANA', () => {
    expect(screen.getByText('12')).toBeInTheDocument()
  })
})

describe('when a custom header is defined', () => {
  let emoteNFT: NFT

  beforeEach(() => {
    emoteNFT = {
      id: 'id',
      name: 'emote name',
      category: NFTCategory.EMOTE,
      network: Network.ETHEREUM,
      owner: '0x1231123',
      data: {
        emote: {
          loop: true,
          hasSound: true,
          rarity: Rarity.COMMON,
          category: EmoteCategory.FUN
        }
      }
    } as NFT

    screen = renderNFTCard({
      nft: emoteNFT,
      price: '12',
      header: 'My custom header'
    })
  })

  it('should render the header text', () => {
    expect(screen.getByText('My custom header')).toBeInTheDocument()
  })

  it('should not render the wearable name', () => {
    expect(screen.queryByText(emoteNFT.name)).not.toBeInTheDocument()
  })
})
