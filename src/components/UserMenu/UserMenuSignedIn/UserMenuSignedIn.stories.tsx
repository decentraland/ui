import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { NFTCategory, Network, Rarity, NotificationType } from '@dcl/schemas'
import { NotificationActiveTab } from '../../Notifications/types'
import { UserMenuSignedIn } from './UserMenuSignedIn'
import '../UserMenu.stories.css'
import { i18n } from '../UserMenu.i18n'

const avatar = {
  name: 'Braian',
  description: 'My avatar',
  ethAddress: '0x1234567890123456789012345678901234567890',
  version: 3,
  userId: 'user123',
  tutorialStep: 0,
  hasClaimedName: true,
  avatar: {
    bodyShape: 'urn:decentraland:off-chain:base-avatars:BaseMale',
    snapshots: {
      face: 'https://peer.decentraland.org/content/contents/QmYJpDfYcjtVJrHmF8X5Yz6bJ5Yz6bJ5Yz6bJ5Yz6bJ5Yz6bJ5',
      face256:
        'https://peer.decentraland.org/content/contents/QmYJpDfYcjtVJrHmF8X5Yz6bJ5Yz6bJ5Yz6bJ5Yz6bJ5Yz6bJ5',
      face128:
        'https://peer.decentraland.org/content/contents/QmYJpDfYcjtVJrHmF8X5Yz6bJ5Yz6bJ5Yz6bJ5Yz6bJ5Yz6bJ5',
      body: 'https://peer.decentraland.org/content/contents/QmYJpDfYcjtVJrHmF8X5Yz6bJ5Yz6bJ5Yz6bJ5Yz6bJ5Yz6bJ5'
    },
    eyes: { color: { r: 0.23046875, g: 0.625, b: 0.3125 } },
    hair: { color: { r: 0.35546875, g: 0.19140625, b: 0.05859375 } },
    skin: { color: { r: 0.94921875, g: 0.76171875, b: 0.6484375 } },
    wearables: [
      'urn:decentraland:off-chain:base-avatars:eyes-01',
      'urn:decentraland:off-chain:base-avatars:eyebrows-00',
      'urn:decentraland:off-chain:base-avatars:nose-00',
      'urn:decentraland:off-chain:base-avatars:mouth-00',
      'urn:decentraland:off-chain:base-avatars:beard',
      'urn:decentraland:off-chain:base-avatars:blue_tshirt',
      'urn:decentraland:off-chain:base-avatars:brown_shoes',
      'urn:decentraland:off-chain:base-avatars:casual_hair_01',
      'urn:decentraland:off-chain:base-avatars:standard_male'
    ]
  }
}

const meta: Meta<typeof UserMenuSignedIn> = {
  title: 'UserMenuSignedIn',
  component: UserMenuSignedIn
}

export default meta
type Story = StoryObj<typeof meta>

export const Guest: Story = {
  render: () => (
    <div className="usermenu-story-container">
      <UserMenuSignedIn
        avatar={{ ...avatar, hasClaimedName: false }}
        trackingId=""
        manaBalances={{ [Network.ETHEREUM]: 1000 }}
        notifications={{
          isOpen: false,
          items: [],
          isLoading: false,
          locale: 'en',
          isOnboarding: false,
          activeTab: NotificationActiveTab.NEWEST,
          onClick: () => undefined,
          onChangeTab: () => undefined,
          onBegin: () => undefined,
          onClose: () => undefined
        }}
        i18n={i18n}
        onClickSignOut={() => undefined}
        onClickActivity={() => undefined}
        onClickProfile={() => undefined}
        onClickMyAssets={() => undefined}
        onClickAccount={() => undefined}
        onClickMarketplaceAuthorization={() => undefined}
      />
    </div>
  )
}

export const SignedIn: Story = {
  render: () => (
    <div className="usermenu-story-container">
      <UserMenuSignedIn
        avatar={avatar}
        trackingId=""
        manaBalances={{ [Network.ETHEREUM]: 1000 }}
        notifications={{
          isOpen: false,
          items: [],
          isLoading: false,
          locale: 'en',
          isOnboarding: false,
          activeTab: NotificationActiveTab.NEWEST,
          onClick: () => undefined,
          onChangeTab: () => undefined,
          onBegin: () => undefined,
          onClose: () => undefined
        }}
        i18n={i18n}
        onClickSignOut={() => undefined}
        onClickActivity={() => undefined}
        onClickProfile={() => undefined}
        onClickMyAssets={() => undefined}
        onClickAccount={() => undefined}
        onClickMarketplaceAuthorization={() => undefined}
      />
    </div>
  )
}

export const WithNotifications: Story = {
  render: () => (
    <div className="usermenu-story-container">
      <UserMenuSignedIn
        avatar={avatar}
        trackingId=""
        manaBalances={{ [Network.ETHEREUM]: 1000 }}
        notifications={{
          isOpen: false,
          items: [
            {
              id: '1',
              type: NotificationType.ITEM_SOLD,
              address: '0x123',
              timestamp: Date.now(),
              read: false,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
              metadata: {
                link: '',
                image: '',
                rarity: Rarity.COMMON,
                nftName: 'Test NFT',
                network: 'ethereum',
                category: NFTCategory.WEARABLE,
                seller: '0x123'
              }
            }
          ],
          isLoading: false,
          locale: 'en',
          isOnboarding: false,
          activeTab: NotificationActiveTab.NEWEST,
          onClick: () => undefined,
          onChangeTab: () => undefined,
          onBegin: () => undefined,
          onClose: () => undefined
        }}
        i18n={i18n}
        onClickSignOut={() => undefined}
        onClickActivity={() => undefined}
        onClickProfile={() => undefined}
        onClickMyAssets={() => undefined}
        onClickAccount={() => undefined}
        onClickMarketplaceAuthorization={() => undefined}
      />
    </div>
  )
}
