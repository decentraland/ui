import * as React from 'react'
import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { WalletIcon } from './WalletIcon'

storiesOf('WalletIcon', module)
  .addDecorator(centered)
  .add('Icon', () => <WalletIcon />)
