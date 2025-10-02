import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Back } from './Back'

const meta: Meta<typeof Back> = {
  title: 'Back',
  component: Back,
  parameters: {
    layout: 'centered'
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  render: () => <Back />
}
