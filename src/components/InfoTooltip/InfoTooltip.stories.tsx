import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { InfoTooltip } from './InfoTooltip'
import './InfoTooltip.stories.css'

const meta: Meta<typeof InfoTooltip> = {
  title: 'InfoTooltip',
  component: InfoTooltip
}

export default meta
type Story = StoryObj<typeof InfoTooltip>

export const Tooltip: Story = {
  render: () => {
    return (
      <div className="dui-info-tooltip-stories">
        <span>Rarities</span>
        <InfoTooltip
          position="bottom center"
          content="The Rarity determines the total number of NFTs that can be minted"
        />
      </div>
    )
  }
}
