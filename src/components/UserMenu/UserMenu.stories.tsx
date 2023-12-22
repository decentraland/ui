import * as React from 'react'
import { Network } from '@dcl/schemas/dist/dapps/network'
import { storiesOf } from '@storybook/react'
import { UserMenu } from './UserMenu'
import { avatar } from '../../data/avatar'

import './UserMenu.stories.css'
import { NotificationActiveTab } from '../Notifications/types'
import { Rarity } from '@dcl/schemas/dist/dapps/rarity'
import { NFTCategory } from '@dcl/schemas/dist/dapps/nft-category'

storiesOf('UserMenu', module)
  .add('Signed out', () => (
    <div className="usermenu-story-container">
      <UserMenu />
    </div>
  ))
  .add('Signed in', () => (
    <div className="usermenu-story-container">
      <UserMenu isSignedIn avatar={avatar} />
    </div>
  ))
  .add('Guest', () => (
    <div className="usermenu-story-container">
      <UserMenu
        isSignedIn
        avatar={{ ...avatar, hasClaimedName: false }}
        manaBalances={{ [Network.ETHEREUM]: 1000, [Network.MATIC]: 2500 }}
        onClickOpen={(
          event: React.MouseEvent<HTMLElement, MouseEvent>,
          trackId: string
        ) => console.log(event, trackId)}
        onClickBalance={(
          event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
          network: Network
        ) => console.log(event, network)}
      />
    </div>
  ))
  .add('Clickable profile', () => (
    <div className="usermenu-story-container">
      <UserMenu isSignedIn avatar={avatar} onClickProfile={() => undefined} />
    </div>
  ))
  .add('Mana', () => (
    <div className="usermenu-story-container">
      <UserMenu
        isSignedIn
        avatar={avatar}
        manaBalances={{ [Network.ETHEREUM]: 1000 }}
      />
    </div>
  ))
  .add('Mana L2', () => (
    <div className="usermenu-story-container">
      <UserMenu
        isSignedIn
        avatar={avatar}
        manaBalances={{ [Network.ETHEREUM]: 1000, [Network.MATIC]: 2500 }}
      />
    </div>
  ))
  .add('Has activity', () => (
    <div className="usermenu-story-container">
      <UserMenu
        isSignedIn
        avatar={avatar}
        onClickSettings={() => undefined}
        onClickActivity={() => undefined}
        manaBalances={{ [Network.ETHEREUM]: 1000, [Network.MATIC]: 2500 }}
        hasActivity
      />
    </div>
  ))
  .add('Notification', () => (
    <div className="usermenu-story-container">
      <UserMenu
        isSignedIn
        avatar={avatar}
        onClickSettings={() => undefined}
        onClickActivity={() => undefined}
        manaBalances={{ [Network.ETHEREUM]: 1000, [Network.MATIC]: 2500 }}
        hasActivity
        notifications={{
          isOnboarding: false,
          isOpen: false,
          isLoading: false,
          items: [],
          locale: 'en',
          activeTab: NotificationActiveTab.NEWEST,
          onBegin: console.log,
          onChangeTab: console.log,
          onClick: console.log,
          onClose: console.log,
        }}
      />
    </div>
  ))
  .add('Notification pending', () => (
    <div className="usermenu-story-container">
      <UserMenu
        isSignedIn
        avatar={avatar}
        onClickSettings={() => undefined}
        onClickActivity={() => undefined}
        manaBalances={{ [Network.ETHEREUM]: 1000, [Network.MATIC]: 2500 }}
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
                category: 'wearable' as NFTCategory,
              },
              created_at: '2023-11-29T12:51:00.600Z',
              updated_at: '2023-11-29T12:51:00.600Z',
            },
          ],
          locale: 'en',
          activeTab: NotificationActiveTab.NEWEST,
          onBegin: console.log,
          onChangeTab: console.log,
          onClick: console.log,
          onClose: console.log,
        }}
      />
    </div>
  ))
