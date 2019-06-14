import * as React from 'react'
import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { Footer } from '../..'

storiesOf('Footer', module)
  .addDecorator(centered)
  .add('Uncontrolled', () => <Footer />)
  .add('Controlled', () => (
    <Footer locale="en" locales={['en', 'es', 'fr', 'ja', 'ko', 'zh']} />
  ))
