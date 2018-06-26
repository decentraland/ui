import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { Loader } from '../..'

storiesOf('Loader', module)
  .add('Main Loader', () => <Loader active size="massive" />)
  .add('Tiny Loader', () => <Loader active size="mini" />)
