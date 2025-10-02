import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { SmartWearableFilter } from './SmartWearableFilter'

const meta: Meta<typeof SmartWearableFilter> = {
  title: 'SmartWearableFilter',
  component: SmartWearableFilter,
  parameters: {
    layout: 'centered'
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const SelectSW: Story = {
  render: () => {
    const i18n = {
      title: 'Smart',
      selected: 'Only Smart'
    }

    const [isOnlySmart, setIsOnlySmart] = useState(false)

    return (
      <SmartWearableFilter
        i18n={i18n}
        isOnlySmart={isOnlySmart}
        onChange={(value) => setIsOnlySmart(value)}
      />
    )
  }
}
