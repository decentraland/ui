import React from 'react'
import { storiesOf } from '@storybook/react'
import { InfoTooltip } from './InfoTooltip'
import './InfoTooltip.stories.css'

storiesOf('InfoTooltip', module).add('Tooltip', () => {
  return (
    <div className="dui-info-tooltip-stories">
      <span>Rarities</span>
      <InfoTooltip
        position="bottom center"
        content="The Rarity determines the total number of NFTs that can be minted"
      />
    </div>
  )
})
