import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Dropdown } from './Dropdown'

const meta: Meta<typeof Dropdown> = {
  title: 'Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered'
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Filters: Story = {
  render: () => (
    <Dropdown text="All polls" direction="right">
      <Dropdown.Menu>
        <Dropdown.Item text="All polls" />
        <Dropdown.Item text="Ongoing polls" />
        <Dropdown.Item text="Closed polls" />
      </Dropdown.Menu>
    </Dropdown>
  )
}
