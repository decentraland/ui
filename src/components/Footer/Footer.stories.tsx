import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { Container, Footer } from '../..'

storiesOf('Footer', module)
  .add('Uncontrolled', () => (
    <Container>
      <Footer />
    </Container>
  ))
  .add('Controlled', () => (
    <Container>
      <Footer locale="en" locales={['en']} />
    </Container>
  ))
