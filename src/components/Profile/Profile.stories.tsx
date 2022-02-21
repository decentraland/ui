import * as React from 'react'
import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { Profile } from './Profile'
import { Mana } from '../Mana/Mana'
import { avatar } from '../../data/avatar'

storiesOf('Profile', module)
  .addDecorator(centered)
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
