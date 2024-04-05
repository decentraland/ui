import React from 'react'
import classnames from 'classnames'
import { Rarity } from '@dcl/schemas'
import { hex2rgb } from '../../lib/colors'
import { Popup } from '../Popup/Popup'
import { RarityBadgeProps } from './RarityBadge.types'
import './RarityBadge.css'

const RarityBadge = ({
  rarity,
  className,
  size,
  withTooltip,
  i18n,
  onClick
}: RarityBadgeProps) => {
  const [lightColor, regularColor] = Rarity.getGradient(rarity)
  const hexColor = hex2rgb(regularColor)

  const trigger = (
    <div
      className={classnames('dui-rarity-badge', className)}
      style={{
        cursor: onClick ? 'pointer' : 'default'
      }}
      title={!withTooltip ? i18n.rarities_description[rarity] : ''}
      onClick={onClick}
    >
      <div
        className={classnames('wrapper', size)}
        style={{
          backgroundColor: `rgb(${hexColor.r} ${hexColor.g} ${hexColor.b} / 20%)`
        }}
      >
        <span className="text" style={{ color: lightColor }}>
          {i18n.rarities[rarity]}
        </span>
      </div>
    </div>
  )

  return withTooltip ? (
    <Popup
      position="top center"
      content={i18n.rarities_description[rarity]}
      trigger={trigger}
    />
  ) : (
    trigger
  )
}

RarityBadge.defaultProps = {
  size: 'medium',
  withTooltip: true
}

export default React.memo(RarityBadge)
