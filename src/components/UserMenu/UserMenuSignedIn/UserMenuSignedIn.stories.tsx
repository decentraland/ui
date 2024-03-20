import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { Network } from '@dcl/schemas/dist/dapps/network'
import { Rarity } from '@dcl/schemas/dist/dapps/rarity'
import { NFTCategory } from '@dcl/schemas/dist/dapps/nft-category'

import { UserMenuSignedIn } from './UserMenuSignedIn'
import {
  DecentralandNotificationType,
  NotificationActiveTab
} from '../../Notifications/types'
import { avatar } from '../../../data/avatar'

import '../UserMenu.stories.css'
import { i18n } from '../UserMenu.i18n'

storiesOf('UserMenuSignedIn', module)
  .add('Guest', () => (
    <div className="usermenu-story-container">
      <UserMenuSignedIn
        avatar={{ ...avatar, hasClaimedName: false }}
        trackingId=""
        isOpen
        onClickAccountSettings={console.log}
        onClickActivity={console.log}
        onClickMyAssets={console.log}
        onClickProfile={console.log}
        onClickSignOut={console.log}
        onClickToggle={console.log}
        onClickWallet={console.log}
        i18n={i18n}
      />
    </div>
  ))
  .add('Without profile', () => (
    <div className="usermenu-story-container">
      <UserMenuSignedIn
        trackingId=""
        address={avatar.ethAddress}
        isOpen
        onClickAccountSettings={console.log}
        onClickActivity={console.log}
        onClickMyAssets={console.log}
        onClickProfile={console.log}
        onClickSignOut={console.log}
        onClickToggle={console.log}
        onClickWallet={console.log}
        i18n={i18n}
      />
    </div>
  ))
  .add('Signed in', () => (
    <div className="usermenu-story-container">
      <UserMenuSignedIn
        avatar={avatar}
        manaBalances={{ [Network.ETHEREUM]: 1000, [Network.MATIC]: 2500 }}
        trackingId=""
        isOpen
        onClickAccountSettings={console.log}
        onClickActivity={console.log}
        onClickMyAssets={console.log}
        onClickProfile={console.log}
        onClickSignOut={console.log}
        onClickToggle={console.log}
        onClickWallet={console.log}
        i18n={i18n}
      />
    </div>
  ))
  .add('Complete', () => (
    <div className="usermenu-story-container">
      <UserMenuSignedIn
        avatar={avatar}
        trackingId=""
        isOpen
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
        onClickAccountSettings={console.log}
        onClickActivity={console.log}
        onClickMyAssets={console.log}
        onClickProfile={console.log}
        onClickSignOut={console.log}
        onClickToggle={console.log}
        onClickWallet={console.log}
        i18n={i18n}
      />
    </div>
  ))
