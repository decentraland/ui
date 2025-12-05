import type { Meta, StoryObj } from '@storybook/react'
import { avatar } from '../../data/avatar'
import { Mana } from '../Mana/Mana'
import { Profile } from './Profile'
import './Profile.stories.css'

const meta: Meta<typeof Profile> = {
  title: 'Profile',
  component: Profile,
}

export default meta
type Story = StoryObj<typeof Profile>
export const NoAvatar: Story = {
  render: () => (
    <>
      <Profile address="0xdeadbeef" />
    </>
  ),
}

export const Avatar: Story = {
  render: () => (
    <>
      <Profile address="0xdeadbeef" avatar={avatar} />
    </>
  ),
}

export const AvatarWithoutName: Story = {
  render: () => (
    <>
      <Profile address="0xdeadbeef" avatar={{ ...avatar, name: null }} />
    </>
  ),
}

export const AvatarWithAnUnclaimedName: Story = {
  render: () => (
    <>
      <Profile
        address="0xdeadbeef"
        avatar={{ ...avatar, hasClaimedName: false }}
      />
    </>
  ),
}

export const ImageOnly: Story = {
  render: () => (
    <>
      <Profile address="0xdeadbeef" avatar={avatar} imageOnly />
    </>
  ),
}

export const TextOnly: Story = {
  render: () => (
    <>
      <Profile address="0xdeadbeef" avatar={avatar} textOnly />
    </>
  ),
}

export const Inline: Story = {
  render: () => (
    <>
      You sent <Mana inline>1,000</Mana> to{' '}
      <Profile address="0xdeadbeef" avatar={avatar} inline />
    </>
  ),
}

export const Decentraland: Story = {
  render: () => (
    <>
      You sent <Mana inline>1,000</Mana> to{' '}
      <Profile address="0xdeadbeef" avatar={avatar} inline isDecentraland />
    </>
  ),
}

export const SlicedAddress: Story = {
  render: () => (
    <div className="ProfileList">
      <Profile
        address="0x89805E5f0698Cb4dB57f0E389f2a75259f78CCF6"
        sliceAddressBy={10}
      />
      <Profile
        address="0x89805E5f0698Cb4dB57f0E389f2a75259f78CCF6"
        sliceAddressBy={20}
      />
      <Profile
        address="0x89805E5f0698Cb4dB57f0E389f2a75259f78CCF6"
        sliceAddressBy={30}
      />
      <Profile
        address="0x89805E5f0698Cb4dB57f0E389f2a75259f78CCF6"
        sliceAddressBy={40}
      />
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <>
      <Profile
        address="0xdeadbeef"
        avatar={avatar}
        inline={false}
        size="normal"
        imageOnly
      />
      <Profile
        address="0xdeadbeef"
        avatar={avatar}
        inline={false}
        size="large"
        imageOnly
      />
      <Profile
        address="0xdeadbeef"
        avatar={avatar}
        inline={false}
        size="huge"
        imageOnly
      />
      <Profile
        address="0xdeadbeef"
        avatar={avatar}
        inline={false}
        size="massive"
        imageOnly
      />
      <Profile
        address="0xdeadbeef"
        avatar={avatar}
        inline={false}
        size="normal"
        imageOnly
        isDecentraland
      />
      <Profile
        address="0xdeadbeef"
        avatar={avatar}
        inline={false}
        size="large"
        imageOnly
        isDecentraland
      />
      <Profile
        address="0xdeadbeef"
        avatar={avatar}
        inline={false}
        size="huge"
        imageOnly
        isDecentraland
      />
      <Profile
        address="0xdeadbeef"
        avatar={avatar}
        inline={false}
        size="massive"
        imageOnly
        isDecentraland
      />
      <Profile address="0xdeadbeef" inline={false} size="normal" imageOnly />
      <Profile address="0xdeadbeef" inline={false} size="large" imageOnly />
      <Profile address="0xdeadbeef" inline={false} size="huge" imageOnly />
      <Profile address="0xdeadbeef" inline={false} size="massive" imageOnly />
    </>
  ),
}

export const ProfileWithAvatarAndContentLinkedToAnotherSite: Story = {
  render: () => (
    <>
      <Profile
        address="0x89805E5f0698Cb4dB57f0E389f2a75259f78CCF6"
        avatar={avatar}
        inline
        as="a"
        href="https://decentraland.zone/marketplace/accounts/0x89805E5f0698Cb4dB57f0E389f2a75259f78CCF6"
        target="_blank"
      />
    </>
  ),
}

export const ProfileWithBlockieAndContentLinkedToAnotherSite: Story = {
  render: () => (
    <>
      <Profile
        address="0x89805E5f0698Cb4dB57f0E389f2a75259f78CCF6"
        inline
        as={'a'}
        href="https://decentraland.zone/marketplace/accounts/0x89805E5f0698Cb4dB57f0E389f2a75259f78CCF6"
        target="_blank"
      />
    </>
  ),
}
