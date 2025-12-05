import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Navbar } from '../Navbar/Navbar'
import { NetworkAlert } from './NetworkAlert'
import '../Navbar/Navbar.stories.css'

const meta: Meta<typeof NetworkAlert> = {
  title: 'NetworkAlert',
  component: NetworkAlert
}

export default meta
type Story = StoryObj<typeof NetworkAlert>

export const PartiallySupportedNetwork: Story = {
  render: () => {
    return (
      <div className="Navbar-story-container">
        <NetworkAlert onSwitchNetwork={() => undefined} />
        <Navbar activePage="dao" />
      </div>
    )
  }
}
