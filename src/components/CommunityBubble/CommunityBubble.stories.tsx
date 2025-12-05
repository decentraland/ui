import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { CommunityBubble } from './CommunityBubble'

const meta: Meta<typeof CommunityBubble> = {
  title: 'CommunityBubble',
  component: CommunityBubble
}

export default meta
type Story = StoryObj<typeof CommunityBubble>

export const Base: Story = {
  render: () => <CommunityBubble />
}
