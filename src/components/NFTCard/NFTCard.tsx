import React, { useCallback } from 'react'
import classNames from 'classnames'
import { Card } from '../Card/Card'
import { Popup } from '../Popup/Popup'
import { Mana } from '../Mana/Mana'
import { NFTImage } from '../NFTImage'
import { getBadges, getSubtitle } from './utils'
import { Badge, Props } from './NFTCard.types'
import './NFTCard.css'

const Badge = ({ badge }: { badge: Badge }) => {
  if (badge.icon && badge.hideLabel) {
    return (
      <Popup
        key={badge.label}
        content={badge.label}
        trigger={
          <span
            className="dui-nft-card__badge--only-icon"
            style={{
              background: badge.color,
              color: badge.textColor ?? 'var(--text)'
            }}
          >
            <i
              className={classNames('dui-nft-card__badge-icon', badge.icon)}
              aria-label={badge.label}
            />
          </span>
        }
      />
    )
  }

  return (
    <span
      className="dui-nft-card__badge"
      style={{
        background: badge.color,
        color: badge.textColor ?? 'var(--text)'
      }}
      key={badge.label}
    >
      {badge.icon && (
        <i className={classNames('dui-nft-card__badge-icon', badge.icon)} />
      )}
      {badge.label}
    </span>
  )
}

export const NFTCard = (props: Props) => {
  const {
    nft,
    i18n,
    header,
    subtitle,
    badges,
    price,
    className,
    ...cardProps
  } = props

  const renderHeader = useCallback(() => {
    if (!header || typeof header === 'string') {
      return (
        <div className="dui-nft-card__header">
          <span className="dui-nft-card__title">{header || nft.name}</span>
          {price && (
            <Mana network={nft.network} inline className="dui-nft-card__price">
              {price}
            </Mana>
          )}
        </div>
      )
    }
    return header
  }, [header])

  const renderSubtitle = useCallback(() => {
    if (!subtitle || typeof subtitle === 'string') {
      return (
        <span className="dui-nft-card__subtitle">
          {subtitle || getSubtitle(nft, i18n)}
        </span>
      )
    }
    return subtitle
  }, [subtitle])

  const renderBadges = useCallback(() => {
    if (badges) {
      return badges
    }

    const nftBadges = getBadges(nft, i18n)
    if (!nftBadges) {
      return null
    }

    return (
      <div className="dui-nft-card__badges">
        {nftBadges.map((badge) => (
          <Badge key={badge.label} badge={badge} />
        ))}
      </div>
    )
  }, [])

  return (
    <Card
      className={classNames(className, 'dui-nft-card')}
      link
      id={nft.id}
      {...cardProps}
    >
      <NFTImage nft={nft} className="dui-nft-card__image" />
      <Card.Content className="dui-nft-card__information">
        {renderHeader()}
        {renderSubtitle()}
        {renderBadges()}
      </Card.Content>
    </Card>
  )
}

NFTCard.defaultProps = {
  i18n: {
    network: {
      ethereum: 'Ethereum',
      matic: 'Matic'
    },
    bodyShape: {
      male: 'Male',
      female: 'Female',
      unisex: 'Unisex'
    },
    playMode: {
      loop: 'Loop',
      once: 'Once'
    },
    category: {
      body_shape: 'Body Shape',
      earring: 'Earring',
      eyebrows: 'Eyebrows',
      eyes: 'Eyes',
      eyewear: 'Eyewear',
      facial_hair: 'Facial Hair',
      feet: 'Feet',
      head: 'Head',
      hair: 'Hair',
      hat: 'Hat',
      helmet: 'Helmet',
      lower_body: 'Lower Body',
      mask: 'Mask',
      mouth: 'Mouth',
      tiara: 'Tiara',
      top_head: 'Top Head',
      upper_body: 'Upper Body',
      skin: 'Skin',
      hands_wear: 'Handwear'
    },
    withSound: 'With sound',
    smart: 'Smart'
  }
}
