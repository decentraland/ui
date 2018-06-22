import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Button } from '../..'

storiesOf('Button', module)
  .add('primary', () => (
    <Button primary onClick={action('clicked')}>
      Primary
    </Button>
  ))
  .add('primary disabled', () => (
    <Button primary disabled onClick={action('clicked')}>
      Primary
    </Button>
  ))
  .add('secondary', () => (
    <Button secondary onClick={action('clicked')}>
      Secondary
    </Button>
  ))
  .add('secondary disabled', () => (
    <Button secondary onClick={action('clicked')}>
      Secondary
    </Button>
  ))
