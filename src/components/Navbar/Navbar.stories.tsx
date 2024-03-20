import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { ChainId } from '@dcl/schemas'
import { avatar } from '../../data/avatar'

import { Navbar } from './Navbar'
import { NavbarPages } from './Navbar.types'
import { Network } from '@dcl/schemas/dist/dapps/network'
import { Rarity } from '@dcl/schemas/dist/dapps/rarity'
import { NFTCategory } from '@dcl/schemas/dist/dapps/nft-category'
import {
  DecentralandNotificationType,
  NotificationActiveTab
} from '../Notifications/types'

import './Navbar.stories.css'

storiesOf('Navbar', module)
  .add('Marketplace', () => {
    return (
      <div className="Navbar-story-container">
        <Navbar activePage={NavbarPages.MARKETPLACE} />
      </div>
    )
  })
  .add('Sign In', () => {
    return (
      <div className="Navbar-story-container">
        <Navbar
          activePage={NavbarPages.MARKETPLACE}
          onClickSignIn={() => console.log('Clicked on sign in')}
        />
      </div>
    )
  })
  .add('Signed in', () => {
    return (
      <div className="Navbar-story-container">
        <Navbar
          activePage={NavbarPages.MARKETPLACE}
          isSignedIn
          avatar={avatar}
          onClickSignIn={() => console.log('Clicked on sign in')}
        />
      </div>
    )
  })
  .add('Signed in', () => {
    return (
      <div className="Navbar-story-container">
        <Navbar
          activePage={NavbarPages.MARKETPLACE}
          isSignedIn
          avatar={avatar}
          onClickSignIn={() => console.log('Clicked on sign in')}
        />
      </div>
    )
  })
  .add('With Chain Selector', () => {
    return (
      <div className="Navbar-story-container">
        <Navbar
          activePage={NavbarPages.MARKETPLACE}
          isSignedIn
          chains={[
            ChainId.ETHEREUM_MAINNET,
            ChainId.MATIC_MAINNET,
            ChainId.ARBITRUM_MAINNET,
            ChainId.OPTIMISM_MAINNET,
            ChainId.BSC_MAINNET,
            ChainId.FANTOM_MAINNET,
            ChainId.AVALANCHE_MAINNET
          ]}
          chainBeingConfirmed={ChainId.MATIC_MAINNET}
          selectedChain={ChainId.ETHEREUM_MAINNET}
          onSelectChain={(chain) => console.log('Selected chain', chain)}
          avatar={avatar}
          onClickSignIn={() => console.log('Clicked on sign in')}
        />
      </div>
    )
  })
  .add('With Balance', () => {
    return (
      <div className="Navbar-story-container">
        <Navbar
          activePage={NavbarPages.MARKETPLACE}
          isSignedIn
          avatar={avatar}
          manaBalances={{ [Network.ETHEREUM]: 1000, [Network.MATIC]: 2500 }}
          onClickSignOut={(e) => console.log('Clicked on sign in', e)}
        />
      </div>
    )
  })
  .add('Width Activity pending', () => {
    return (
      <div className="Navbar-story-container">
        <Navbar
          activePage={NavbarPages.MARKETPLACE}
          isSignedIn
          avatar={avatar}
          onClickSignOut={(e) => console.log('Clicked on sign in ', e)}
          manaBalances={{ [Network.ETHEREUM]: 1000, [Network.MATIC]: 2500 }}
          onClickBalance={(e, network) =>
            console.log('Clicked on balance ', e, network)
          }
          onClickActivity={(e) => console.log('Clicked on activity ', e)}
          hasActivity
        />
      </div>
    )
  })
  .add('With Notification', () => {
    return (
      <div className="Navbar-story-container">
        <Navbar
          activePage={NavbarPages.MARKETPLACE}
          isSignedIn
          avatar={avatar}
          onClickSignOut={(e) => console.log('Clicked on sign in ', e)}
          manaBalances={{ [Network.ETHEREUM]: 1000, [Network.MATIC]: 2500 }}
          onClickBalance={(e, network) =>
            console.log('Clicked on balance ', e, network)
          }
          onClickActivity={(e) => console.log('Clicked on activity ', e)}
          hasActivity
          notifications={{
            isOnboarding: false,
            isOpen: false,
            isLoading: false,
            items: [
              {
                id: 'A',
                read: true,
                type: DecentralandNotificationType.ITEM_SOLD,
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
                updated_at: '2023-11-30T12:51:00.600Z'
              }
            ],
            locale: 'en',
            activeTab: NotificationActiveTab.NEWEST,
            onBegin: console.log,
            onChangeTab: console.log,
            onClick: console.log,
            onClose: console.log
          }}
        />
      </div>
    )
  })
  .add('With Notification pending', () => {
    return (
      <div className="Navbar-story-container">
        <Navbar
          activePage={NavbarPages.MARKETPLACE}
          isSignedIn
          avatar={avatar}
          onClickSignOut={(e) => console.log('Clicked on sign in ', e)}
          manaBalances={{ [Network.ETHEREUM]: 1000, [Network.MATIC]: 2500 }}
          onClickBalance={(e, network) =>
            console.log('Clicked on balance ', e, network)
          }
          onClickActivity={(e) => console.log('Clicked on activity ', e)}
          hasActivity
          notifications={{
            isOnboarding: false,
            isOpen: false,
            isLoading: false,
            items: [
              {
                id: 'A',
                read: false,
                type: DecentralandNotificationType.ITEM_SOLD,
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
            ],
            locale: 'en',
            activeTab: NotificationActiveTab.NEWEST,
            onBegin: console.log,
            onChangeTab: console.log,
            onClick: console.log,
            onClose: console.log
          }}
        />
      </div>
    )
  })
