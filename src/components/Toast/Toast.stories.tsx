import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Icon from '../../assets/alert.svg'

import { Toast, ToastType } from './Toast'
import './Toast.stories.css'

const meta: Meta<typeof Toast> = {
  title: 'Toast',
  component: Toast
}

export default meta
type Story = StoryObj<typeof Toast>
export const SimpleToastExample: Story = {
  render: () => <Toast title="Toast title" body="Toast body" />
}

export const JSXProps: Story = {
  render: () => (
    <Toast
      title={<h1>Title</h1>}
      body={
        <p>
          <small>Small</small> <a href="#">Link</a>
        </p>
      }
    />
  )
}

export const Closable: Story = {
  render: () => <Toast title="Toast title" body="Toast body" closable />
}

export const Timeout: Story = {
  render: () => (
    <Toast
      title="Timeout"
      body="I will call onClose after 1 second"
      closable
      timeout={1000}
      onClose={() => console.log('I should be closing now')}
    />
  )
}

export const InfoToast: Story = {
  render: () => <Toast type={ToastType.INFO} title="Info Toast" body="INFO" />
}

export const WarnToast: Story = {
  render: () => <Toast type={ToastType.WARN} title="Warn toast" body="WARN" />
}

export const ErrorToast: Story = {
  render: () => (
    <Toast type={ToastType.ERROR} title="Error toast" body="ERROR" />
  )
}

export const ToastWithIcon: Story = {
  render: () => (
    <Toast
      type={ToastType.INFO}
      title="Toast with icon"
      body="This toast has an icon"
      icon={<img src={Icon} />}
    />
  )
}

export const ToastWithExtraClasses: Story = {
  render: () => (
    <Toast
      type={ToastType.INFO}
      title="Toast with fixed height and width"
      body="This toast has a fixed height and width"
      className="height-200 width-300"
    />
  )
}
