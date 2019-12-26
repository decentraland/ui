import * as React from 'react'
import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { Header } from './Header'

storiesOf('Header', module)
  .addDecorator(centered)
  .add('Subheader + Header', () => (
    <>
      <Header sub>Votes</Header>
      <Header>20,212</Header>
    </>
  ))
  .add('Sizes', () => (
    <>
      <Header size="huge">Huge</Header>
      <Header size="large">Large</Header>
      <Header size="medium">Medium</Header>
      <Header size="small">Small</Header>
      <Header size="tiny">Tiny</Header>
    </>
  ))
