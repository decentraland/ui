import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ToggleBox } from './ToggleBox'

const meta: Meta<typeof ToggleBox> = {
  title: 'ToggleBox',
  component: ToggleBox,
}

export default meta
type Story = StoryObj<typeof ToggleBox>

export const Simple: Story = {
  render: () => (
    <ToggleBox
      header="Header text"
      items={[
        { title: 'Item 1', description: 'Description of the item 1' },
        { title: 'Item 2', description: 'Description of the item 2' },
        { title: 'Item 3', description: 'Description of the item 3' }
      ]}
    />
  ),
}

export const WithActiveItem: Story = {
  render: () => (
    <ToggleBox
      header="Header text"
      value={1}
      items={[
        {
          title: 'Item 1',
          description: 'Description of the item 1',
          value: 1
        },
        {
          title: 'Item 2',
          description: 'Description of the Active item 2',
          value: 2
        },
        {
          title: 'Item 3',
          description: 'Description of the item 3',
          value: 3
        }
      ]}
    />
  ),
}

export const WithDisableItems: Story = {
  render: () => (
    <ToggleBox
      header="Header text with disabled items"
      value={3}
      items={[
        {
          title: 'Item 1',
          description: 'Description of the active item 1',
          value: 1,
          disabled: false
        },
        {
          title: 'Item 2',
          description: 'Description of the disabled item 2',
          value: 2,
          disabled: true
        },
        {
          title: 'Item 3',
          description: 'Description of the item 3',
          value: 3,
          disabled: false
        }
      ]}
    />
  ),
}

export const WithoutBorderBorderless: Story = {
  render: () => (
    <ToggleBox
      header="Without border"
      borderless
      value={3}
      items={[
        {
          title: 'Item 1',
          description: 'Description of the active item 1',
          value: 1,
          disabled: false
        },
        {
          title: 'Item 2',
          description: 'Description of the disabled item 2',
          value: 2,
          disabled: true
        },
        {
          title: 'Item 3',
          description: 'Description of the item 3',
          value: 3,
          disabled: false
        }
      ]}
    />
  ),
}
