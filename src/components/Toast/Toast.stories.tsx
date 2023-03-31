import * as React from 'react'
import { storiesOf } from '@storybook/react'
import Icon from '../../assets/alert.svg'

import { Toast, ToastType } from './Toast'
import './Toast.stories.css'

storiesOf('Toast', module)
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
  .add('Timeout', () => (
    <Toast
      title="Timeout"
      body="I will call onClose after 1 second"
      closable
      timeout={1000}
      onClose={() => console.log('I should be closing now')}
    />
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
  .add('Toast with icon', () => (
    <Toast
      type={ToastType.INFO}
      title="Toast with icon"
      body="This toast has an icon"
      icon={<img src={Icon} />}
    />
  ))
  .add('Toast with extra classes', () => (
    <Toast
      type={ToastType.INFO}
      title="Toast with fixed height and width"
      body="This toast has a fixed height and width"
      className="height-200 width-300"
    />
  ))
