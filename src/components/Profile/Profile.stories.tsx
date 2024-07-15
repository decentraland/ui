import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { avatar } from '../../data/avatar'
import { Mana } from '../Mana/Mana'
import { Profile } from './Profile'
import './Profile.stories.css'

storiesOf('Profile', module)
  .add('No avatar', () => (
    <>
      <Profile address="0xdeadbeef" />
    </>
  ))
  .add('Avatar', () => (
    <>
      <Profile address="0xdeadbeef" avatar={avatar} />
    </>
  ))
  .add('Avatar without name', () => (
    <>
      <Profile address="0xdeadbeef" avatar={{ ...avatar, name: null }} />
    </>
  ))
  .add('Avatar with an unclaimed name', () => (
    <>
      <Profile
        address="0xdeadbeef"
        avatar={{ ...avatar, hasClaimedName: false }}
      />
    </>
  ))
  .add('Image only', () => (
    <>
      <Profile address="0xdeadbeef" avatar={avatar} imageOnly />
    </>
  ))
  .add('Text only', () => (
    <>
      <Profile address="0xdeadbeef" avatar={avatar} textOnly />
    </>
  ))
  .add('Inline', () => (
    <>
      You sent <Mana inline>1,000</Mana> to{' '}
      <Profile address="0xdeadbeef" avatar={avatar} inline />
    </>
  ))
  .add('Decentraland', () => (
    <>
      You sent <Mana inline>1,000</Mana> to{' '}
      <Profile address="0xdeadbeef" avatar={avatar} inline isDecentraland />
    </>
  ))
  .add('Sliced address', () => (
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
  ))
  .add('Sizes', () => (
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
  ))
  .add('Profile with avatar and content linked to another site', () => (
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
  ))
  .add('Profile with blockie and content linked to another site', () => (
    <>
      <Profile
        address="0x89805E5f0698Cb4dB57f0E389f2a75259f78CCF6"
        inline
        as={'a'}
        href="https://decentraland.zone/marketplace/accounts/0x89805E5f0698Cb4dB57f0E389f2a75259f78CCF6"
        target="_blank"
      />
    </>
  ))
