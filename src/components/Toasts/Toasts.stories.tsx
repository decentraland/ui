import * as React from 'react'
import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'

import { Toast } from '../Toast/Toast'
import { Toasts } from './Toasts'

storiesOf('Toasts', module)
  .addDecorator(centered)
  .add('Lists toasts', () => (
    <Toasts>
      <Toast title="Title 1" body="Body 1" />
      <Toast title="Title 2" body="Body 2" />
    </Toasts>
  ))
  .add('top left', () => (
    <Toasts position="top left">
      <Toast title="Title 1" body="Body 1" />
      <Toast title="Title 2" body="Body 2" />
      <Toast title="Title 3" body="Body 3" />
    </Toasts>
  ))
  .add('bottom left', () => (
    <Toasts position="bottom left">
      <Toast title="Title 1" body="Body 1" />
      <Toast title="Title 2" body="Body 2" />
      <Toast title="Title 3" body="Body 3" />
    </Toasts>
  ))
  .add('bottom right', () => (
    <Toasts position="bottom right">
      <Toast title="Title 1" body="Body 1" />
      <Toast title="Title 2" body="Body 2" />
      <Toast title="Title 3" body="Body 3" />
    </Toasts>
  ))
