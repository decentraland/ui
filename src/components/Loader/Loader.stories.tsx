import * as React from 'react'
import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { Loader } from './Loader'

storiesOf('Loader', module)
  .addDecorator(centered)
  .add('Main Loader', () => <Loader active size="massive" />)
  .add('Tiny Loader', () => <Loader active size="mini" />)
