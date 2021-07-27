import * as React from 'react'
import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { Message } from './Message'

storiesOf('Message', module)
  .addDecorator(centered)
  .add('Error message', () => (
    <Message
      error
      visible
      content={'An error occured!'}
      header={'Metamask error'}
    />
  ))
  .add('Warning message', () => (
    <Message
      warning
      visible
      content={'An warning!'}
      header={'Metamask warning'}
    />
  ))
  .add('Success message', () => (
    <Message success visible content={'Success!'} header={'Metamask success'} />
  ))
