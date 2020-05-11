import * as React from 'react'
import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { Back } from './Back'

storiesOf('Back', module)
  .addDecorator(centered)
  .add('Example', () => <Back />)
