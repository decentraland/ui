import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { SmartIcon } from './SmartIcon'

const meta: Meta<typeof SmartIcon> = {
  title: 'SmartIcon',
  component: SmartIcon
}

export default meta
type Story = StoryObj<typeof SmartIcon>

export const SmartIconStory: Story = {
  render: () => <SmartIcon />
}
