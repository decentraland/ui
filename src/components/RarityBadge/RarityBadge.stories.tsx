import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Rarity } from '@dcl/schemas'
import RarityBadge from './RarityBadge'
import './RarityBadge.stories.css'

const i18n = {
  rarities: Rarity.getRarities().reduce((acc, rarity) => {
    acc[rarity as string] = rarity
    return acc
  }, {}) as unknown as Record<Rarity, string>,
  rarities_description: Rarity.getRarities().reduce((acc, rarity) => {
    acc[rarity as string] = `This is the ${rarity} rarity`
    return acc
  }, {}) as unknown as Record<Rarity, string>
}

const meta: Meta<typeof RarityBadge> = {
  title: 'RarityBadge',
  component: RarityBadge
}

export default meta
type Story = StoryObj<typeof RarityBadge>

export const SmallSizeBadges: Story = {
  render: () => {
    return (
      <div className="dui-rarity-badge-story-wrapper">
        {Rarity.getRarities().map((rarity) => (
          <RarityBadge
            key={rarity}
            i18n={i18n}
            rarity={rarity}
            size="small"
            onClick={() => alert(`Clicked ${rarity}!`)}
          />
        ))}
      </div>
    )
  }
}

export const MediumSizeBadges: Story = {
  render: () => {
    return (
      <div className="dui-rarity-badge-story-wrapper">
        {Rarity.getRarities().map((rarity) => (
          <RarityBadge
            key={rarity}
            i18n={i18n}
            rarity={rarity}
            onClick={() => alert(`Clicked ${rarity}!`)}
          />
        ))}
      </div>
    )
  }
}
