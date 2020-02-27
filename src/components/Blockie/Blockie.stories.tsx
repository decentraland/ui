import * as React from 'react'
import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { Address } from '../Address/Address'
import { Mana } from '../Mana/Mana'
import { Blockie } from './Blockie'

const address = Math.random().toString()

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
