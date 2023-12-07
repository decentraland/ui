import * as React from 'react'
import { storiesOf } from '@storybook/react'
import Notifications from './Notifications'
import NotificationItemImage from './NotificationItemImage'
import { NFTCategory, Rarity } from '@dcl/schemas'
import BidReceived from '../Icons/Notifications/BidReceived'
import { ActiveTab } from './types'

storiesOf('Notifications Toggle', module)
  .add('Without new notifications', () => {
    return (
      <div>
        <Notifications
          isOpen={false}
          isLoading={false}
          isOnboarding={false}
          items={[]}
          locale="en"
          activeTab="newest"
          onChangeTab={(e, newTab) => console.log(newTab)}
          onClick={() => console.log('Toggle button')}
          onBegin={() => console.log('Begin')}
          onClose={(_, m) => console.log(m)}
        />
      </div>
    )
  })
  .add('With new notificatitons', () => {
    return (
      <div>
        <Notifications
          isOpen={false}
          isLoading={false}
          isOnboarding={false}
          items={[
            {
              id: 'A',
              read: false,
              type: 'item_sold',
              address: '0xA',
              timestamp: 1680108689 * 1000,
              metadata: {
                link: 'https://market.decentraland.org/contracts/0x4c290f486bae507719c562b6b524bdb71a2570c9/tokens/1020',
                image:
                  'https://peer.decentraland.org/lambdas/collections/contents/urn:decentraland:ethereum:collections-v1:atari_launch:atari_green_upper_body/thumbnail',
                rarity: 'epic' as Rarity,
                seller: '0x8bc619e7f9ca9949b8440245fd9d8c4c002edf02',
                nftName: 'Green Atari Tee',
                network: 'ethereum',
                category: 'wearable' as NFTCategory
              },
              created_at: '2023-11-29T12:51:00.600Z',
              updated_at: '2023-11-29T12:51:00.600Z'
            }
          ]}
          locale="en"
          activeTab="newest"
          onChangeTab={(e, newTab) => console.log(newTab)}
          onClick={() => console.log('Toggle button')}
          onBegin={() => console.log('Begin')}
          onClose={(_, m) => console.log(m)}
        />
      </div>
    )
  })
  .add('Onboarding', () => {
    return (
      <div>
        <Notifications
          isOpen
          isLoading={false}
          isOnboarding
          items={[
            {
              id: 'A',
              read: false,
              type: 'item_sold',
              address: '0xA',
              timestamp: 1680108689 * 1000,
              metadata: {
                link: 'https://market.decentraland.org/contracts/0x4c290f486bae507719c562b6b524bdb71a2570c9/tokens/1020',
                image:
                  'https://peer.decentraland.org/lambdas/collections/contents/urn:decentraland:ethereum:collections-v1:atari_launch:atari_green_upper_body/thumbnail',
                rarity: 'epic' as Rarity,
                seller: '0x8bc619e7f9ca9949b8440245fd9d8c4c002edf02',
                nftName: 'Green Atari Tee',
                network: 'ethereum',
                category: 'wearable' as NFTCategory
              },
              created_at: '2023-11-29T12:51:00.600Z',
              updated_at: '2023-11-29T12:51:00.600Z'
            }
          ]}
          activeTab="newest"
          onChangeTab={(e, newTab) => console.log(newTab)}
          locale="en"
          onClick={() => console.log('Toggle button')}
          onBegin={() => console.log('Begin')}
          onClose={(_, m) => console.log(m)}
        />
      </div>
    )
  })
  .add('Open not loading', () => {
    const [tab, setTab] = React.useState('newest')
    return (
      <div>
        <Notifications
          isOpen={true}
          isLoading={false}
          isOnboarding={false}
          locale="en"
          items={[
            {
              id: 'B',
              read: false,
              type: 'royalties_earned',
              address: '0xA',
              timestamp: new Date().getTime(),
              metadata: {
                link: 'https://market.decentraland.zone/contracts/0xb726634ed82ac04e6bca66b3b97cc41a2c10ec31/tokens/9',
                image:
                  'https://peer.decentraland.org/lambdas/collections/contents/urn:decentraland:ethereum:collections-v1:binance_us_collection:binance_us_upper_body/thumbnail',
                rarity: 'common' as Rarity,
                network: 'polygon',
                nftName: 'NJacket',
                category: 'wearable' as NFTCategory,
                royaltiesCut: '30000000000000000',
                royaltiesCollector: '0x2a39d4f68133491f0442496f601cde2a945b6d31'
              },
              created_at: '2023-11-29T12:51:00.600Z',
              updated_at: '2023-11-29T12:51:00.600Z'
            },
            {
              id: 'A',
              read: true,
              type: 'item_sold',
              address: '0xA',
              timestamp: new Date(
                new Date().setHours(new Date().getHours() - 19)
              ).getTime(),
              metadata: {
                link: 'https://market.decentraland.org/contracts/0xa8ee490e4c4da48cc1653502c1a77479d4d818de/tokens/590',
                image:
                  'https://peer.decentraland.org/lambdas/collections/contents/urn:decentraland:ethereum:collections-v1:binance_us_collection:binance_us_upper_body/thumbnail',
                rarity: 'epic' as Rarity,
                seller: '0x6b347a82fcac4e6a38d1fc40e3631bd8f9495e9f',
                nftName: 'Exclusive Binance Hoodie',
                network: 'ethereum',
                category: 'wearable' as NFTCategory
              },
              created_at: '2023-11-29T12:51:00.600Z',
              updated_at: '2023-11-29T12:51:00.600Z'
            },
            {
              id: 'A',
              read: true,
              type: 'item_sold',
              address: '0xA',
              timestamp: new Date(
                new Date().setHours(new Date().getHours() - 19)
              ).getTime(),
              metadata: {
                link: 'https://market.decentraland.org/contracts/0xa8ee490e4c4da48cc1653502c1a77479d4d818de/tokens/590',
                image:
                  'https://peer.decentraland.org/lambdas/collections/contents/urn:decentraland:ethereum:collections-v1:binance_us_collection:binance_us_upper_body/thumbnail',
                rarity: 'epic' as Rarity,
                seller: '0x6b347a82fcac4e6a38d1fc40e3631bd8f9495e9f',
                nftName: 'Exclusive Binance Hoodie',
                network: 'ethereum',
                category: 'wearable' as NFTCategory
              },
              created_at: '2023-11-29T12:51:00.600Z',
              updated_at: '2023-11-29T12:51:00.600Z'
            },
            {
              id: 'A',
              read: true,
              type: 'item_sold',
              address: '0xA',
              timestamp: new Date(
                new Date().setHours(new Date().getHours() - 19)
              ).getTime(),
              metadata: {
                link: 'https://market.decentraland.org/contracts/0xa8ee490e4c4da48cc1653502c1a77479d4d818de/tokens/590',
                image:
                  'https://peer.decentraland.org/lambdas/collections/contents/urn:decentraland:ethereum:collections-v1:binance_us_collection:binance_us_upper_body/thumbnail',
                rarity: 'epic' as Rarity,
                seller: '0x6b347a82fcac4e6a38d1fc40e3631bd8f9495e9f',
                nftName: 'Exclusive Binance Hoodie',
                network: 'ethereum',
                category: 'wearable' as NFTCategory
              },
              created_at: '2023-11-29T12:51:00.600Z',
              updated_at: '2023-11-29T12:51:00.600Z'
            },
            {
              id: 'A',
              read: true,
              type: 'item_sold',
              address: '0xA',
              timestamp: new Date(
                new Date().setHours(new Date().getHours() - 19)
              ).getTime(),
              metadata: {
                link: 'https://market.decentraland.org/contracts/0xa8ee490e4c4da48cc1653502c1a77479d4d818de/tokens/590',
                image:
                  'https://peer.decentraland.org/lambdas/collections/contents/urn:decentraland:ethereum:collections-v1:binance_us_collection:binance_us_upper_body/thumbnail',
                rarity: 'epic' as Rarity,
                seller: '0x6b347a82fcac4e6a38d1fc40e3631bd8f9495e9f',
                nftName: 'Exclusive Binance Hoodie',
                network: 'ethereum',
                category: 'wearable' as NFTCategory
              },
              created_at: '2023-11-29T12:51:00.600Z',
              updated_at: '2023-11-29T12:51:00.600Z'
            },
            {
              id: 'A',
              read: true,
              type: 'item_sold',
              address: '0xA',
              timestamp: new Date(
                new Date().setHours(new Date().getHours() - 19)
              ).getTime(),
              metadata: {
                link: 'https://market.decentraland.org/contracts/0xa8ee490e4c4da48cc1653502c1a77479d4d818de/tokens/590',
                image:
                  'https://peer.decentraland.org/lambdas/collections/contents/urn:decentraland:ethereum:collections-v1:binance_us_collection:binance_us_upper_body/thumbnail',
                rarity: 'epic' as Rarity,
                seller: '0x6b347a82fcac4e6a38d1fc40e3631bd8f9495e9f',
                nftName: 'Exclusive Binance Hoodie',
                network: 'ethereum',
                category: 'wearable' as NFTCategory
              },
              created_at: '2023-11-29T12:51:00.600Z',
              updated_at: '2023-11-29T12:51:00.600Z'
            },
            {
              id: 'A',
              read: true,
              type: 'item_sold',
              address: '0xA',
              timestamp: new Date(
                new Date().setHours(new Date().getHours() - 19)
              ).getTime(),
              metadata: {
                link: 'https://market.decentraland.org/contracts/0xa8ee490e4c4da48cc1653502c1a77479d4d818de/tokens/590',
                image:
                  'https://peer.decentraland.org/lambdas/collections/contents/urn:decentraland:ethereum:collections-v1:binance_us_collection:binance_us_upper_body/thumbnail',
                rarity: 'epic' as Rarity,
                seller: '0x6b347a82fcac4e6a38d1fc40e3631bd8f9495e9f',
                nftName: 'Exclusive Binance Hoodie',
                network: 'ethereum',
                category: 'wearable' as NFTCategory
              },
              created_at: '2023-11-29T12:51:00.600Z',
              updated_at: '2023-11-29T12:51:00.600Z'
            },
            {
              id: 'A',
              read: true,
              type: 'item_sold',
              address: '0xA',
              timestamp: new Date(
                new Date().setHours(new Date().getHours() - 19)
              ).getTime(),
              metadata: {
                link: 'https://market.decentraland.org/contracts/0xa8ee490e4c4da48cc1653502c1a77479d4d818de/tokens/590',
                image:
                  'https://peer.decentraland.org/lambdas/collections/contents/urn:decentraland:ethereum:collections-v1:binance_us_collection:binance_us_upper_body/thumbnail',
                rarity: 'epic' as Rarity,
                seller: '0x6b347a82fcac4e6a38d1fc40e3631bd8f9495e9f',
                nftName: 'Exclusive Binance Hoodie',
                network: 'ethereum',
                category: 'wearable' as NFTCategory
              },
              created_at: '2023-11-29T12:51:00.600Z',
              updated_at: '2023-11-29T12:51:00.600Z'
            },
            {
              id: 'A',
              read: true,
              type: 'item_sold',
              address: '0xA',
              timestamp: new Date(
                new Date().setHours(new Date().getHours() - 19)
              ).getTime(),
              metadata: {
                link: 'https://market.decentraland.org/contracts/0xa8ee490e4c4da48cc1653502c1a77479d4d818de/tokens/590',
                image:
                  'https://peer.decentraland.org/lambdas/collections/contents/urn:decentraland:ethereum:collections-v1:binance_us_collection:binance_us_upper_body/thumbnail',
                rarity: 'epic' as Rarity,
                seller: '0x6b347a82fcac4e6a38d1fc40e3631bd8f9495e9f',
                nftName: 'Exclusive Binance Hoodie',
                network: 'ethereum',
                category: 'wearable' as NFTCategory
              },
              created_at: '2023-11-29T12:51:00.600Z',
              updated_at: '2023-11-29T12:51:00.600Z'
            },
            {
              id: 'A',
              read: true,
              type: 'item_sold',
              address: '0xA',
              timestamp: new Date(
                new Date().setHours(new Date().getHours() - 19)
              ).getTime(),
              metadata: {
                link: 'https://market.decentraland.org/contracts/0xa8ee490e4c4da48cc1653502c1a77479d4d818de/tokens/590',
                image:
                  'https://peer.decentraland.org/lambdas/collections/contents/urn:decentraland:ethereum:collections-v1:binance_us_collection:binance_us_upper_body/thumbnail',
                rarity: 'epic' as Rarity,
                seller: '0x6b347a82fcac4e6a38d1fc40e3631bd8f9495e9f',
                nftName: 'Exclusive Binance Hoodie',
                network: 'ethereum',
                category: 'wearable' as NFTCategory
              },
              created_at: '2023-11-29T12:51:00.600Z',
              updated_at: '2023-11-29T12:51:00.600Z'
            },
            {
              id: 'AC',
              read: true,
              type: 'item_sold',
              address: '0xA',
              timestamp: 1701123003 * 1000,
              metadata: {
                link: 'https://market.decentraland.org/contracts/0xa8ee490e4c4da48cc1653502c1a77479d4d818de/tokens/590',
                image:
                  'https://peer.decentraland.org/lambdas/collections/contents/urn:decentraland:ethereum:collections-v1:binance_us_collection:binance_us_upper_body/thumbnail',
                rarity: 'uncommon' as Rarity,
                seller: '0x6b347a82fcac4e6a38d1fc40e3631bd8f9495e9f',
                nftName: 'Binance US Hoodie',
                network: 'ethereum',
                category: 'wearable' as NFTCategory
              },
              created_at: '2023-11-29T12:51:00.600Z',
              updated_at: '2023-11-29T12:51:00.600Z'
            },
            {
              id: 'AS',
              read: true,
              type: 'item_sold',
              address: '0xA',
              timestamp: 1701123003 * 1000,
              metadata: {
                link: 'https://market.decentraland.org/contracts/0xa8ee490e4c4da48cc1653502c1a77479d4d818de/tokens/590',
                image:
                  'https://peer.decentraland.org/lambdas/collections/contents/urn:decentraland:ethereum:collections-v1:binance_us_collection:binance_us_upper_body/thumbnail',
                rarity: 'uncommon' as Rarity,
                seller: '0x6b347a82fcac4e6a38d1fc40e3631bd8f9495e9f',
                nftName: 'Binance US Hoodie',
                network: 'ethereum',
                category: 'wearable' as NFTCategory
              },
              created_at: '2023-11-29T12:51:00.600Z',
              updated_at: '2023-11-29T12:51:00.600Z'
            }
          ]}
          activeTab={tab as ActiveTab}
          onChangeTab={(e, newTab) => setTab(newTab)}
          onClick={() => console.log('Toggle button')}
          onBegin={() => console.log('Begin')}
          onClose={(_, m) => console.log(m)}
        />
      </div>
    )
  })
  .add('Open not loading but empty', () => {
    return (
      <div>
        <Notifications
          isOpen={true}
          isLoading={false}
          isOnboarding={false}
          locale="en"
          items={[]}
          activeTab="newest"
          onChangeTab={(e, newTab) => console.log(newTab)}
          onClick={() => console.log('Toggle button')}
          onBegin={() => console.log('Begin')}
          onClose={(_, m) => console.log(m)}
        />
      </div>
    )
  })
  .add('Open loading', () => {
    return (
      <div>
        <Notifications
          isOpen={true}
          isLoading={true}
          isOnboarding={false}
          locale="en"
          items={[]}
          activeTab="newest"
          onChangeTab={(e, newTab) => console.log(newTab)}
          onClick={() => console.log('Toggle button')}
          onBegin={() => console.log('Begin')}
          onClose={(_, m) => console.log(m)}
        />
      </div>
    )
  })
  .add('NotificationItemImage', () => {
    return (
      <div>
        <NotificationItemImage
          rarity={Rarity.EPIC}
          url="https://peer.decentraland.org/lambdas/collections/contents/urn:decentraland:ethereum:collections-v1:binance_us_collection:binance_us_upper_body/thumbnail"
          icon={<BidReceived />}
        />
      </div>
    )
  })
