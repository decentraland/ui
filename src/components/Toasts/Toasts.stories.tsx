import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Toast } from '../Toast/Toast'
import { Toasts } from './Toasts'

const meta: Meta<typeof Toasts> = {
  title: 'Toasts',
  component: Toasts,
  parameters: {
    layout: 'centered'
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const ListsToasts: Story = {
  render: () => (
    <Toasts>
      <Toast title="Title 1" body="Body 1" />
      <Toast title="Title 2" body="Body 2" />
    </Toasts>
  )
}

export const topLeft: Story = {
  render: () => (
    <Toasts position="top left">
      <Toast title="Title 1" body="Body 1" />
      <Toast title="Title 2" body="Body 2" />
      <Toast title="Title 3" body="Body 3" />
    </Toasts>
  )
}

export const topCenter: Story = {
  render: () => (
    <Toasts position="top center">
      <Toast title="Title 1" body="Body 1" />
      <Toast title="Title 2" body="Body 2" />
      <Toast title="Title 3" body="Body 3" />
    </Toasts>
  )
}

export const bottomLeft: Story = {
  render: () => (
    <Toasts position="bottom left">
      <Toast title="Title 1" body="Body 1" />
      <Toast title="Title 2" body="Body 2" />
      <Toast title="Title 3" body="Body 3" />
    </Toasts>
  )
}

export const bottomRight: Story = {
  render: () => (
    <Toasts position="bottom right">
      <Toast title="Title 1" body="Body 1" />
      <Toast title="Title 2" body="Body 2" />
      <Toast title="Title 3" body="Body 3" />
    </Toasts>
  )
}

export const bottomCenter: Story = {
  render: () => (
    <Toasts position="bottom center">
      <Toast title="Title 1" body="Body 1" />
      <Toast title="Title 2" body="Body 2" />
      <Toast title="Title 3" body="Body 3" />
    </Toasts>
  )
}
