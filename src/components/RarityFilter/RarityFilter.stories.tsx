import React, { useState } from 'react'
import { Rarity } from '@dcl/schemas'
import type { Meta, StoryObj } from '@storybook/react'
import { RarityFilter } from './RarityFilter'
import './RarityFilter.stories.css'

const meta: Meta<typeof RarityFilter> = {
  title: 'RarityFilter',
  component: RarityFilter,
  parameters: {
    layout: 'centered'
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const SelectRarities: Story = {
  render: () => {
    const i18n = {
      rarities: Object.values(Rarity).reduce((acc, rarity) => {
        acc[rarity as string] = rarity
        return acc
      }, {}) as unknown as Record<Rarity, string>,
      title: 'Rarities',
      all_rarities: 'All rarities',
      count_rarities: (count: number) => `${count} rarities`,
      tooltip: 'The Rarity determines the total number of NFTs that can be minted'
    }

    const [rarities, setRarities] = useState([])

    return <RarityFilter i18n={i18n} rarities={rarities} onChange={setRarities} />
  }
}
