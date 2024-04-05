import React from 'react'
import { BodyShape, NFT, NFTCategory, Rarity } from '@dcl/schemas'
import { hex2rgb } from '../../lib/colors'
import { Profile } from '../Profile/Profile'
import { Badge, NFTCardI18N } from './NFTCard.types'

const DEFAULT_BADGE_COLOR = '#37333d'

function _getEmoteBadges(emote: NFT['data']['emote'], i18n: NFTCardI18N) {
  const [lightColor, regularColor] = Rarity.getGradient(emote.rarity)
  const hexColor = hex2rgb(regularColor)
  return [
    {
      color: `rgb(${hexColor.r} ${hexColor.g} ${hexColor.b} / 20%)`,
      label: emote.rarity,
      textColor: lightColor
    },
    {
      color: DEFAULT_BADGE_COLOR,
      label: emote.loop ? i18n.playMode.loop : i18n.playMode.once,
      icon: emote.loop
        ? 'dui-nft-card__badge-icon--loop'
        : 'dui-nft-card__badge-icon--once',
      hideLabel: true
    },
    ...(emote.hasSound
      ? [
          {
            color: DEFAULT_BADGE_COLOR,
            label: i18n.withSound,
            icon: 'dui-nft-card__badge-icon--sound',
            hideLabel: true
          }
        ]
      : [])
  ]
}

function _getWearableBadges(
  wearable: NFT['data']['wearable'],
  i18n: NFTCardI18N
) {
  const bodyShape =
    wearable.bodyShapes.length === 2
      ? 'unisex'
      : wearable.bodyShapes[0] === BodyShape.MALE
      ? 'male'
      : 'female'
  const [lightColor, regularColor] = Rarity.getGradient(wearable.rarity)
  const hexColor = hex2rgb(regularColor)
  return [
    {
      color: `rgb(${hexColor.r} ${hexColor.g} ${hexColor.b} / 20%)`,
      label: wearable.rarity,
      textColor: lightColor
    },
    {
      color: DEFAULT_BADGE_COLOR,
      label: i18n.category[wearable.category],
      icon: `dui-nft-card__badge-icon--${wearable.category}`,
      hideLabel: true
    },
    {
      color: DEFAULT_BADGE_COLOR,
      label: i18n.bodyShape[bodyShape],
      icon: `dui-nft-card__badge-icon--${bodyShape}`,
      hideLabel: true
    },
    ...(wearable.isSmart
      ? [
          {
            color: DEFAULT_BADGE_COLOR,
            label: i18n.smart,
            icon: 'dui-nft-card__badge-icon--smart',
            hideLabel: true
          }
        ]
      : [])
  ]
}

function _getEstateBadges(estate: NFT['data']['estate']) {
  return [
    {
      color: DEFAULT_BADGE_COLOR,
      label: `${estate.parcels.length} LAND`
    }
  ]
}

function _getParcelBadges(parcel: NFT['data']['parcel']) {
  return [
    {
      color: DEFAULT_BADGE_COLOR,
      label: `${parcel.x},${parcel.y}`,
      icon: 'dui-nft-card__badge-icon--parcel'
    }
  ]
}

export function getBadges(nft: NFT, i18n: NFTCardI18N): Badge[] {
  switch (nft.category) {
    case NFTCategory.EMOTE:
      return _getEmoteBadges(nft.data.emote, i18n)
    case NFTCategory.WEARABLE:
      return _getWearableBadges(nft.data.wearable, i18n)
    case NFTCategory.ESTATE:
      return _getEstateBadges(nft.data.estate)
    case NFTCategory.PARCEL:
      return _getParcelBadges(nft.data.parcel)
    case NFTCategory.ENS:
      return []
  }
}

export function getSubtitle(nft: NFT, i18n: NFTCardI18N) {
  switch (nft.category) {
    case NFTCategory.EMOTE:
    case NFTCategory.WEARABLE:
      return <Profile address={nft.owner} textOnly />
    case NFTCategory.ENS:
    case NFTCategory.ESTATE:
    case NFTCategory.PARCEL:
      return i18n.network[`${nft.network.toLowerCase()}`]
  }
}
