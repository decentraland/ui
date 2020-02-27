import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { SignIn } from './SignIn'

storiesOf('SignIn', module)
  .add('Connect', () => <SignIn />)
  .add('Connecting', () => <SignIn isConnecting />)
  .add('Connected', () => <SignIn isConnected />)
  .add('Error', () => <SignIn hasError />)
