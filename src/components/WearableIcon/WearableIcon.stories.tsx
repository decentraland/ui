import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { WearableIcon } from './WearableIcon'

const meta: Meta<typeof WearableIcon> = {
  title: 'WearableIcon',
  component: WearableIcon,
  parameters: {
    layout: 'centered'
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Icon: Story = {
  render: () => <WearableIcon />
}
