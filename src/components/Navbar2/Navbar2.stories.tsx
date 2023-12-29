import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { avatar } from '../../data/avatar'

import { Navbar2 } from './Navbar2'
import { Navbar2Pages } from './Navbar2.types'
import { Network } from '@dcl/schemas/dist/dapps/network'
import { Rarity } from '@dcl/schemas/dist/dapps/rarity'
import { NFTCategory } from '@dcl/schemas/dist/dapps/nft-category'
import { NotificationActiveTab } from '../Notifications/types'

import './Navbar2.stories.css'

storiesOf('Navbar2', module)
  .add('Marketplace', () => {
    return (
      <div className="dui-navbar2-story-container">
        <Navbar2 activePage={Navbar2Pages.MARKETPLACE} />
      </div>
    )
  })
  .add('Sign In', () => {
    return (
      <div className="dui-navbar2-story-container">
        <Navbar2
          activePage={Navbar2Pages.MARKETPLACE}
          onClickSignIn={() => console.log('Clicked on sign in')}
        />
      </div>
    )
  })
  .add('Signed in', () => {
    return (
      <div className="dui-navbar2-story-container">
        <Navbar2
          activePage={Navbar2Pages.MARKETPLACE}
          isSignedIn
          avatar={avatar}
          onClickSignIn={() => console.log('Clicked on sign in')}
        />
      </div>
    )
  })
  .add('Signed in', () => {
    return (
      <div className="dui-navbar2-story-container">
        <Navbar2
          activePage={Navbar2Pages.MARKETPLACE}
          isSignedIn
          avatar={avatar}
          onClickSignIn={() => console.log('Clicked on sign in')}
        />
      </div>
    )
  })
  .add('With Balance', () => {
    return (
      <div className="dui-navbar2-story-container">
        <Navbar2
          activePage={Navbar2Pages.MARKETPLACE}
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
      <div className="dui-navbar2-story-container">
        <Navbar2
          activePage={Navbar2Pages.MARKETPLACE}
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
      <div className="dui-navbar2-story-container">
        <Navbar2
          activePage={Navbar2Pages.MARKETPLACE}
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
      <div className="dui-navbar2-story-container">
        <Navbar2
          activePage={Navbar2Pages.MARKETPLACE}
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
