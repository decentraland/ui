import * as React from 'react'
import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { Header } from '../Header/Header'
import { Mana } from './Mana'

storiesOf('Mana', module)
  .addDecorator(centered)
  .add('Symbol', () => <Mana />)
  .add('Symbol + MANA', () => <Mana>MANA</Mana>)
  .add('Total voted', () => (
    <>
      <Header sub>Total voted</Header>
      <Mana>1,235,345</Mana>
    </>
  ))
  .add('Sizes', () => (
    <>
      <Mana size="huge">1,000</Mana>
      <Mana size="large">1,000</Mana>
      <Mana size="medium">1,000</Mana>
      <Mana size="small">1,000</Mana>
      <Mana size="tiny">1,000</Mana>
    </>
  ))
  .add('In a paragraph', () => (
    <p>
      You've voted with <Mana inline>1,000</Mana>.
    </p>
  ))
