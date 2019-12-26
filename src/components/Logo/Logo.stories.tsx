import * as React from 'react'
import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { Logo } from './Logo'

storiesOf('Logo', module)
  .addDecorator(centered)
  .add('Decentraland', () => <Logo />)
