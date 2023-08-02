import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { Container } from '../Container/Container'
import { Header } from '../Header/Header'
import { HeaderMenu } from '../HeaderMenu/HeaderMenu'
import { AssetCard, AssetCardProps } from './AssetCard'
import { Rarity, Network } from '@dcl/schemas'

const props: AssetCardProps = {
  asset: {
    id: '0x10cd9f15bb7d58ac0c8f4ec5e1b77c0f5df0b652-0',
    url: '/contracts/0x10cd9f15bb7d58ac0c8f4ec5e1b77c0f5df0b652/items/0',
    name: 'Upper body sci',
    rarity: Rarity.EPIC,
    network: Network.MATIC,
    creator: '0xd4fec88a49eb514e9347ec655d0481d8483a9ae0'
  },
  action: 'Buy directly from creator',
  actionIcon: 'mintIcon',
  imagensrc:
    'https://peer.decentraland.zone/lambdas/collections/contents/urn:decentraland:mumbai:collections-v2:0x10cd9f15bb7d58ac0c8f4ec5e1b77c0f5df0b652:0/thumbnail',
  extraInformation: <span>1 listing</span>,
  notForSale: false,
  price: '10',
  owners: '3 owners',
  onClickCardURL: 'https://market.decentraland.zone'
}

storiesOf('AssetCard', module).add('Catalog', () => (
  <Container>
    <HeaderMenu>
      <HeaderMenu.Left>
        <Header>Asset Cards for Catalog Items</Header>
      </HeaderMenu.Left>
    </HeaderMenu>
    <div>
      <AssetCard {...props} />
    </div>
  </Container>
))
