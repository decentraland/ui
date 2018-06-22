import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { Header } from '../..'

storiesOf('Header', module).add('Stats', () => (
  <>
    <Header sub>Voting with</Header>
    <Header size="large">45,965 MANA</Header>
  </>
))
