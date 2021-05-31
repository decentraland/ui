import * as React from 'react'
import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'

import { Toast, ToastType } from './Toast'
import './Toast.stories.css'

storiesOf('Toast', module)
  .addDecorator(centered)
  .add('Simple toast example', () => (
    <Toast title="Toast title" body="Toast body" />
  ))
  .add('JSX props', () => (
    <Toast
      title={<h1>Title</h1>}
      body={
        <p>
          <small>Small</small> <a href="#">Link</a>
        </p>
      }
    />
  ))
  .add('Closable', () => (
    <Toast title="Toast title" body="Toast body" closable />
  ))
  .add('Info toast', () => (
    <Toast type={ToastType.INFO} title="Info Toast" body="INFO" />
  ))
  .add('Warn toast', () => (
    <Toast type={ToastType.WARN} title="Warn toast" body="WARN" />
  ))
  .add('Error toast', () => (
    <Toast type={ToastType.ERROR} title="Error toast" body="ERROR" />
  ))
