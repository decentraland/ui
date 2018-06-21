import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Button } from '../..'

storiesOf('Button', module)
  .add('simple button', () => <Button onClick={action('clicked')}>Hola</Button>)
  .add('primary button', () => (
    <Button primary onClick={action('clicked')}>
      Hola
    </Button>
  ))
