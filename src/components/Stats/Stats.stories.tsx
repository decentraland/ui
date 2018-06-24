import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { Mana, Stats } from '../..'

storiesOf('Stats', module).add('Poll Results', () => (
  <>
    <Stats title="Token">
      <Mana size="large">MANA</Mana>
    </Stats>
    <Stats title="Total Voted">
      <Mana size="large">1,235,345</Mana>
    </Stats>
    <Stats title="Total Votes">20</Stats>
    <Stats title="Parcial Result">Yes</Stats>
    <Stats title="Time Left">1 week</Stats>
  </>
))
