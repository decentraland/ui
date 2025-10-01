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
        items={[
          { id: 'home', label: 'Home', href: '/' },
          { id: 'marketplace', label: 'Marketplace', href: '/marketplace' },
          { id: 'profile', label: 'Profile', href: '/profile' }
        ]}
      />
    </>
  )
}
