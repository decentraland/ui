import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { IconBadge } from './IconBadge'

const meta: Meta<typeof IconBadge> = {
  title: 'IconBadge',
  component: IconBadge,
  parameters: {
    layout: 'centered'
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const WithIcon: Story = {
  render: () => (
    <IconBadge
      icon="utility"
      text="Utility"
      onClick={() => console.log('Clicked!')}
    />
  )
}

export const WithCustomIcon: Story = {
  render: () => (
    <IconBadge text="Custom Icon">
      <div>Custom Icon Component</div>
    </IconBadge>
  )
}

export const WithoutText: Story = {
  render: () => (
    <IconBadge icon="BaseFemale" onClick={() => console.log('Clicked!')} />
  )
}

export const WithoutIcon: Story = {
  render: () => (
    <IconBadge text="No Icon" onClick={() => console.log('Clicked!')} />
  )
}
