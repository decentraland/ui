import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { SmartIcon } from './SmartIcon'

const meta: Meta<typeof SmartIcon> = {
  title: 'SmartIcon',
  component: SmartIcon,
  parameters: {
    layout: 'centered'
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const SmartIconStory: Story = {
  render: () => <SmartIcon />
}
