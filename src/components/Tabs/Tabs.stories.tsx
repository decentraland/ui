import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Tabs } from './Tabs'
import './Tabs.stories.css'

const meta: Meta<typeof Tabs> = {
  title: 'Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered'
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <div className="Tabs-story-container">
      <Tabs>
        <Tabs.Tab active>Atlas</Tabs.Tab>
        <Tabs.Tab>Market</Tabs.Tab>
        <Tabs.Tab>My Assets</Tabs.Tab>
      </Tabs>
    </div>
  )
}

export const Fullscreen: Story = {
  render: () => (
    <div className="Tabs-story-container">
      <Tabs isFullscreen>
        <Tabs.Tab active>Atlas</Tabs.Tab>
        <Tabs.Tab>Market</Tabs.Tab>
        <Tabs.Tab>My Assets</Tabs.Tab>
      </Tabs>
    </div>
  )
}
