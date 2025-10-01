import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { CatalogCard, CatalogCardProps } from './CatalogCard'
import { Rarity, Network } from '@dcl/schemas'

const meta: Meta<typeof CatalogCard> = {
  title: 'CatalogCard',
  component: CatalogCard
}

export default meta
type Story = StoryObj<typeof meta>

const i18n = {
  rarities: Rarity.getRarities().reduce((acc, rarity) => {
    acc[rarity as string] = rarity
    return acc
  }, {}) as unknown as Record<Rarity, string>,
  rarities_description: Rarity.getRarities().reduce((acc, rarity) => {
    acc[rarity as string] = `This is the ${rarity} rarity`
    return acc
  }, {}) as unknown as Record<Rarity, string>
}

const props: CatalogCardProps = {
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
  i18n
}

export const Wearable: Story = {
  args: props
}
