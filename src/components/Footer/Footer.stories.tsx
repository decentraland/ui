import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { Footer } from '../..'

storiesOf('Footer', module)
  .add('Uncontrolled', () => <Footer />)
  .add('Controlled', () => (
    <Footer locale="en" locales={['en', 'es', 'fr', 'ja', 'ko', 'zh']} />
  ))
