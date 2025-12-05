import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Back } from './Back'

const meta: Meta<typeof Back> = {
  title: 'Back',
  component: Back,
}

export default meta
type Story = StoryObj<typeof Back>

export const Example: Story = {
  render: () => <Back />,
}
