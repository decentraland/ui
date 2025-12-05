import type { Meta, StoryObj } from '@storybook/react'
import { NotificationType } from '@dcl/schemas'
import { Network } from '@dcl/schemas/dist/dapps/network'
import { NFTCategory } from '@dcl/schemas/dist/dapps/nft-category'
import { Rarity } from '@dcl/schemas/dist/dapps/rarity'

import { avatar } from '../../data/avatar'
import { NotificationActiveTab } from '../Notifications/types'
import { UserMenu } from './UserMenu'
import { i18n } from './UserMenu.i18n'

import './UserMenu.stories.css'

const meta: Meta<typeof UserMenu> = {
  title: 'UserMenu',
  component: UserMenu,
}

export default meta
type Story = StoryObj<typeof UserMenu>
export const SignedOut: Story = {
  render: () => (
    <div className="usermenu-story-container">
      <UserMenu i18n={i18n} />
    </div>
  ),
}

export const SignedIn: Story = {
  render: () => (
    <div className="usermenu-story-container">
      <UserMenu i18n={i18n} isSignedIn avatar={avatar} />
    </div>
  ),
}

export const SigningIn: Story = {
  render: () => (
    <div className="usermenu-story-container">
      <UserMenu i18n={i18n} isSigningIn />
    </div>
  ),
}

export const Disconnecting: Story = {
  render: () => (
    <div className="usermenu-story-container">
      <UserMenu i18n={i18n} isDisconnecting />
    </div>
  ),
}

export const Guest: Story = {
  render: () => (
    <div className="usermenu-story-container">
      <UserMenu
        i18n={i18n}
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
  ),
}

export const ClickableProfile: Story = {
  render: () => (
    <div className="usermenu-story-container">
      <UserMenu
        i18n={i18n}
        isSignedIn
        avatar={avatar}
        onClickProfile={() => undefined}
      />
    </div>
  ),
}

export const Mana: Story = {
  render: () => (
    <div className="usermenu-story-container">
      <UserMenu
        i18n={i18n}
        isSignedIn
        avatar={avatar}
        manaBalances={{ [Network.ETHEREUM]: 1000 }}
      />
    </div>
  ),
}

export const ManaL2: Story = {
  render: () => (
    <div className="usermenu-story-container">
      <UserMenu
        i18n={i18n}
        isSignedIn
        avatar={avatar}
        manaBalances={{ [Network.ETHEREUM]: 1000, [Network.MATIC]: 2500 }}
      />
    </div>
  ),
}

export const HasActivity: Story = {
  render: () => (
    <div className="usermenu-story-container">
      <UserMenu
        i18n={i18n}
        isSignedIn
        avatar={avatar}
        onClickMarketplaceAuthorization={() => undefined}
        onClickActivity={() => undefined}
        manaBalances={{ [Network.ETHEREUM]: 1000, [Network.MATIC]: 2500 }}
        hasActivity
      />
    </div>
  ),
}

export const Notification: Story = {
  render: () => (
    <div className="usermenu-story-container">
      <UserMenu
        i18n={i18n}
        isSignedIn
        avatar={avatar}
        onClickMarketplaceAuthorization={() => undefined}
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
          onClose: console.log
        }}
      />
    </div>
  ),
}

export const NotificationPending: Story = {
  render: () => (
    <div className="usermenu-story-container">
      <UserMenu
        i18n={i18n}
        isSignedIn
        avatar={avatar}
        onClickMarketplaceAuthorization={() => undefined}
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
              type: NotificationType.ITEM_SOLD,
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
  ),
}
