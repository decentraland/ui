import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { CategoryFilter } from './CategoryFilter'
import './CategoryFilter.stories.css'

const meta: Meta<typeof CategoryFilter> = {
  title: 'CategoryFilter',
  component: CategoryFilter,
  parameters: {
    layout: 'centered'
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <>
      <CategoryFilter
        i18n={{
          title: 'Categories'
        }}
        items={[
          { id: 'wearables', label: 'Wearables' },
          { id: 'land', label: 'Land' },
          { id: 'emotes', label: 'Emotes' }
        ]}
        value="wearables"
        onClick={() => undefined}
      />
    </>
  )
}
