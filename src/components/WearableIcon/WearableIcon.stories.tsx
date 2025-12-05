import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { WearableIcon } from './WearableIcon'

const meta: Meta<typeof WearableIcon> = {
  title: 'WearableIcon',
  component: WearableIcon,
}

export default meta
type Story = StoryObj<typeof WearableIcon>

export const Icon: Story = {
  render: () => <WearableIcon />,
}
