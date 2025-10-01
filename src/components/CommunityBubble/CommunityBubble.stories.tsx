import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { CommunityBubble } from './CommunityBubble'

const meta: Meta<typeof CommunityBubble> = {
  title: 'CommunityBubble',
  component: CommunityBubble,
  parameters: {
    layout: 'centered'
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Base: Story = {
  render: () => <CommunityBubble />
}
