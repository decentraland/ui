import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Message } from './Message'

const meta: Meta<typeof Message> = {
  title: 'Message',
  component: Message,
}

export default meta
type Story = StoryObj<typeof Message>

export const ErrorMessage: Story = {
  render: () => (
    <Message
      error
      visible
      content={'An error occured!'}
      header={'Metamask error'}
    />
  ),
}

export const WarningMessage: Story = {
  render: () => (
    <Message
      warning
      visible
      content={'An warning!'}
      header={'Metamask warning'}
    />
  ),
}

export const SuccessMessage: Story = {
  render: () => (
    <Message success visible content={'Success!'} header={'Metamask success'} />
  ),
}
