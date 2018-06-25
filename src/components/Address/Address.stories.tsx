import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { Address } from '../..'

const address = '0x68FFc53C43C65C8Dd778969320e21B85b10363cE'

storiesOf('Address', module)
  .add('Plain', () => <Address value={address} />)
  .add('Strong', () => <Address strong value={address} />)
  .add('Full length', () => <Address shorten={false} value={address} />)
  .add('Tooltip', () => <Address tooltip value={address} />)
  .add('In a paragraph', () => (
    <p>
      Your address is <Address strong value={address} />.
    </p>
  ))
