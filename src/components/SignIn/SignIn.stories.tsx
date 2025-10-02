import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { SignIn } from './SignIn'

const meta: Meta<typeof SignIn> = {
  title: 'SignIn',
  component: SignIn,
  parameters: {
    layout: 'centered'
  }
}

export default meta
type Story = StoryObj<typeof meta>
export const Connect: Story = {
  render: () => <SignIn />
}
export const Connecting: Story = {
  render: () => <SignIn isConnecting />
}
export const Connected: Story = {
  render: () => <SignIn isConnected />
}
export const Error: Story = {
  render: () => <SignIn hasError />
}
