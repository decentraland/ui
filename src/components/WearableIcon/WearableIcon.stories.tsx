import * as React from 'react'
import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { WearableIcon } from './WearableIcon'

storiesOf('WearableIcon', module)
  .addDecorator(centered)
  .add('Icon', () => <WearableIcon />)
