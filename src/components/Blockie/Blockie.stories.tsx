import * as React from 'react'
import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { Address, Mana, Blockie } from '../..'

const address = '0x68FFc53C43C65C8Dd778969320e21B85b10363cE'

storiesOf('Blockie', module)
  .addDecorator(centered)
  .add('Single', () => <Blockie seed={address} />)
  .add('Scales', () => (
    <>
      <Blockie seed={address} scale={2} />
      <Blockie seed={address} scale={3} />
      <Blockie seed={address} scale={5} />
      <Blockie seed={address} scale={8} />
      <Blockie seed={address} scale={13} />
      <Blockie seed={address} scale={21} />
    </>
  ))
  .add('In a paragraph', () => (
    <p>
      You've transfered <Mana inline>1,000</Mana> to{' '}
      <Blockie scale={3} seed={address}>
        <Address value={address} strong />
      </Blockie>
      .
    </p>
  ))
