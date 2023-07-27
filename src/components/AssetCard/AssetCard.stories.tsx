import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { Container } from '../Container/Container'
import { Header } from '../Header/Header'
import { HeaderMenu } from '../HeaderMenu/HeaderMenu'
import { AssetCard, AssetCardFilters, AssetCardTranslations } from './AssetCard'
import {
  NFTCategory,
  Rarity,
  WearableCategory,
  BodyShape,
  Network,
  Item,
  CatalogSortBy
} from '@dcl/schemas'

const asset: Item = {
  id: '0x10cd9f15bb7d58ac0c8f4ec5e1b77c0f5df0b652-0',
  beneficiary: '0xd4fec88a49eb514e9347ec655d0481d8483a9ae0',
  itemId: '0',
  name: 'SciFiSuit Female',
  thumbnail:
    'https://peer.decentraland.zone/lambdas/collections/contents/urn:decentraland:mumbai:collections-v2:0x10cd9f15bb7d58ac0c8f4ec5e1b77c0f5df0b652:0/thumbnail',
  url: '/contracts/0x10cd9f15bb7d58ac0c8f4ec5e1b77c0f5df0b652/items/0',
  category: NFTCategory.WEARABLE,
  contractAddress: '0x10cd9f15bb7d58ac0c8f4ec5e1b77c0f5df0b652',
  rarity: Rarity.EPIC,
  available: 5000,
  isOnSale: true,
  creator: '0xd4fec88a49eb514e9347ec655d0481d8483a9ae0',
  data: {
    wearable: {
      description: '',
      category: WearableCategory.UPPER_BODY,
      bodyShapes: [BodyShape.FEMALE],
      rarity: Rarity.EPIC,
      isSmart: false
    }
  },
  network: Network.MATIC,
  chainId: 80001,
  price: '10000000000000000000',
  createdAt: 1690307365,
  updatedAt: 1690307560,
  reviewedAt: 1690307626,
  firstListedAt: 1690307754,
  soldAt: 1689859260,
  minPrice: '2000000000000000000',
  maxListingPrice: '10000000000000000000',
  minListingPrice: '10000000000000000000',
  listings: 2,
  owners: null,
  picks: {
    count: 0,
    pickedByUser: false
  }
}

const translations: AssetCardTranslations = {
  listing: 'Listing',
  listings: 'Listings',
  available_for_mint: 'Buy directly from creator',
  available_listings_in_range: 'Available listings in this range',
  cheapest_listing: 'Cheapest Listing',
  not_for_sale: 'Not for sale',
  owner: 'Owner',
  owners: 'Owners',
  cheapest_option: 'Cheapest Option',
  cheapest_option_range: 'Cheapest Option within range',
  most_expensive: 'Most Expensive',
  most_expensive_range: 'Most Expensive within range',
  also_minting: 'Buy directly from the creator'
}

const assetFilters: AssetCardFilters = {
  sortBy: CatalogSortBy.CHEAPEST
}

storiesOf('AssetCard', module).add('Catalog', () => (
  <Container>
    <HeaderMenu>
      <HeaderMenu.Left>
        <Header>Asset Cards for Catalog Items</Header>
      </HeaderMenu.Left>
    </HeaderMenu>
    <AssetCard
      asset={asset}
      translations={translations}
      onClickCardURL={'https://market.decentraland.zone'}
      assetFilters={assetFilters}
    />
  </Container>
))
