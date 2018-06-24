import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { Header } from '../..'

storiesOf('Header', module).add('Subheader + Header', () => (
  <>
    <Header sub>Votes</Header>
    <Header size="large">20,212</Header>
  </>
))
