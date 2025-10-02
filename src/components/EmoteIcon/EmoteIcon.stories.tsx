import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { EmoteIcon } from './EmoteIcon'

const meta: Meta<typeof EmoteIcon> = {
  title: 'EmoteIcon',
  component: EmoteIcon,
  parameters: {
    layout: 'centered'
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Icon: Story = {
  render: () => <EmoteIcon />
}
