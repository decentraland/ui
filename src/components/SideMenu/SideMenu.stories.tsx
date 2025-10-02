import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { SideMenu } from './SideMenu'

const meta: Meta<typeof SideMenu> = {
  title: 'SideMenu',
  component: SideMenu,
  parameters: {
    layout: 'centered'
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <>
      <SideMenu
        value="home"
        items={[
          { id: 'home', label: 'Home' },
          { id: 'marketplace', label: 'Marketplace' },
          { id: 'profile', label: 'Profile' }
        ]}
      />
    </>
  )
}
