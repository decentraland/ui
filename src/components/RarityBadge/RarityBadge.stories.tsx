import React from 'react'
import { Rarity } from '@dcl/schemas'
import { storiesOf } from '@storybook/react'
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

storiesOf('RarityBadge', module)
  .add('Small size badges', () => {
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
  })
  .add('Medium size badges', () => {
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
  })
