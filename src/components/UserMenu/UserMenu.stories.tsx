import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Network } from '@dcl/schemas'
import { UserMenu } from './UserMenu'
import './UserMenu.stories.css'

const i18n = {
  signIn: 'Sign In',
  signOut: 'Sign Out',
  guest: 'Guest',
  settings: 'Settings',
  profile: 'Profile',
  activity: 'Activity',
  marketplace: 'Marketplace',
  myAssets: 'My Assets',
  account: 'Account',
  viewProfile: 'View Profile',
  marketplaceAuthorizations: 'Marketplace Authorizations',
  download: 'Download'
}

const avatar = {
  userId: 'userId',
  name: 'User Name',
  hasClaimedName: true,
  description: 'User description',
  ethAddress: '0x1234567890123456789012345678901234567890',
  version: 1,
  avatar: {
    snapshots: {
      face: 'https://peer.decentraland.zone/lambdas/collections/contents/urn:decentraland:off-chain:base-avatars:base-avatar/thumbnail',
      face256:
        'https://peer.decentraland.zone/lambdas/collections/contents/urn:decentraland:off-chain:base-avatars:base-avatar/thumbnail',
      face128:
        'https://peer.decentraland.zone/lambdas/collections/contents/urn:decentraland:off-chain:base-avatars:base-avatar/thumbnail',
      body: 'https://peer.decentraland.zone/lambdas/collections/contents/urn:decentraland:off-chain:base-avatars:base-avatar/thumbnail'
    }
  }
}

const meta: Meta<typeof UserMenu> = {
  title: 'UserMenu',
  component: UserMenu,
  parameters: {
    layout: 'centered'
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const SignedOut: Story = {
  render: () => (
    <div className="usermenu-story-container">
      <UserMenu i18n={i18n} />
    </div>
  )
}

export const SignedIn: Story = {
  render: () => (
    <div className="usermenu-story-container">
      <UserMenu i18n={i18n} isSignedIn avatar={avatar} />
    </div>
  )
}

export const SigningIn: Story = {
  render: () => (
    <div className="usermenu-story-container">
      <UserMenu i18n={i18n} isSigningIn />
    </div>
  )
}

export const Disconnecting: Story = {
  render: () => (
    <div className="usermenu-story-container">
      <UserMenu i18n={i18n} isDisconnecting />
    </div>
  )
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
  )
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
  )
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
  )
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
  )
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
  )
}

export const Notification: Story = {
  render: () => (
    <div className="usermenu-story-container">
      <UserMenu
        i18n={i18n}
        isSignedIn
        avatar={avatar}
        manaBalances={{ [Network.ETHEREUM]: 1000, [Network.MATIC]: 2500 }}
        hasActivity
        hasNotification
      />
    </div>
  )
}
