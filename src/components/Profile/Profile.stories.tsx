import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Mana } from '../Mana/Mana'
import Profile from './Profile'
import './Profile.stories.css'

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

const meta: Meta<typeof Profile> = {
  title: 'Profile',
  component: Profile
}

export default meta
type Story = StoryObj<typeof meta>

export const NoAvatar: Story = {
  render: () => (
    <>
      <Profile address="0xdeadbeef" />
    </>
  )
}

export const Avatar: Story = {
  render: () => (
    <>
      <Profile address="0xdeadbeef" avatar={avatar} />
    </>
  )
}

export const NoClaimedName: Story = {
  render: () => (
    <>
      <Profile
        address="0xdeadbeef"
        avatar={{ ...avatar, hasClaimedName: false }}
      />
    </>
  )
}

export const ImageOnly: Story = {
  render: () => (
    <>
      <Profile address="0xdeadbeef" avatar={avatar} imageOnly />
    </>
  )
}

export const TextOnly: Story = {
  render: () => (
    <>
      <Profile address="0xdeadbeef" avatar={avatar} textOnly />
    </>
  )
}

export const Inline: Story = {
  render: () => (
    <>
      You sent <Mana inline>1,000</Mana> to{' '}
      <Profile address="0xdeadbeef" avatar={avatar} inline />{' '}
      <strong>cazala</strong>
    </>
  )
}

export const InlineNoClaimedName: Story = {
  render: () => (
    <>
      You sent <Mana inline>1,000</Mana> to{' '}
      <Profile
        address="0xdeadbeef"
        avatar={{ ...avatar, hasClaimedName: false }}
        inline
      />{' '}
      <strong>cazala</strong>
    </>
  )
}

export const InlineImageOnly: Story = {
  render: () => (
    <>
      You sent <Mana inline>1,000</Mana> to{' '}
      <Profile address="0xdeadbeef" avatar={avatar} inline imageOnly />{' '}
      <strong>cazala</strong>
    </>
  )
}

export const InlineTextOnly: Story = {
  render: () => (
    <>
      You sent <Mana inline>1,000</Mana> to{' '}
      <Profile address="0xdeadbeef" avatar={avatar} inline textOnly />{' '}
      <strong>cazala</strong>
    </>
  )
}

export const InlineNoAvatar: Story = {
  render: () => (
    <>
      You sent <Mana inline>1,000</Mana> to{' '}
      <Profile address="0xdeadbeef" inline /> <strong>cazala</strong>
    </>
  )
}

export const InlineNoAvatarNoClaimedName: Story = {
  render: () => (
    <>
      You sent <Mana inline>1,000</Mana> to{' '}
      <Profile
        address="0xdeadbeef"
        avatar={{ ...avatar, hasClaimedName: false }}
        inline
      />{' '}
      <strong>cazala</strong>
    </>
  )
}

export const InlineNoAvatarImageOnly: Story = {
  render: () => (
    <>
      You sent <Mana inline>1,000</Mana> to{' '}
      <Profile address="0xdeadbeef" inline imageOnly /> <strong>cazala</strong>
    </>
  )
}

export const InlineNoAvatarTextOnly: Story = {
  render: () => (
    <>
      You sent <Mana inline>1,000</Mana> to{' '}
      <Profile address="0xdeadbeef" inline textOnly /> <strong>cazala</strong>
    </>
  )
}

export const InlineNoAvatarNoClaimedNameImageOnly: Story = {
  render: () => (
    <>
      You sent <Mana inline>1,000</Mana> to{' '}
      <Profile
        address="0xdeadbeef"
        avatar={{ ...avatar, hasClaimedName: false }}
        inline
        imageOnly
      />{' '}
      <strong>cazala</strong>
    </>
  )
}

export const InlineNoAvatarNoClaimedNameTextOnly: Story = {
  render: () => (
    <>
      You sent <Mana inline>1,000</Mana> to{' '}
      <Profile
        address="0xdeadbeef"
        avatar={{ ...avatar, hasClaimedName: false }}
        inline
        textOnly
      />{' '}
      <strong>cazala</strong>
    </>
  )
}
