import * as React from 'react'
import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { Mana } from '../Mana/Mana'
import { Stats } from './Stats'

storiesOf('Stats', module)
  .addDecorator(centered)
  .add('Single Result', () => (
    <>
      <Stats title="Total Voted">
        <Mana>1,235,345</Mana>
      </Stats>
    </>
  ))
  .add('Poll Results', () => (
    <>
      <Stats title="Token">
        <Mana>MANA</Mana>
      </Stats>
      <Stats title="Total Voted">
        <Mana>1,235,345</Mana>
      </Stats>
      <Stats title="Total Votes">20</Stats>
      <Stats title="Parcial Result">Yes</Stats>
      <Stats title="Time Left">1 week</Stats>
    </>
  ))
