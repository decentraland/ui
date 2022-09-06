import * as React from 'react'
import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { EmoteIcon } from './EmoteIcon'

storiesOf('EmoteIcon', module)
  .addDecorator(centered)
  .add('Icon', () => <EmoteIcon />)
