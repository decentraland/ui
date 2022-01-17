import * as React from 'react'
import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { SmartIcon } from './SmartIcon'

storiesOf('SmartIcon', module)
  .addDecorator(centered)
  .add('Smart Icon', () => <SmartIcon />)
