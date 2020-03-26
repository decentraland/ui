import * as React from 'react'
import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { StarWalletIcon } from './StarWalletIcon'

storiesOf('StarWalletIcon', module)
  .addDecorator(centered)
  .add('Icon', () => <StarWalletIcon />)
