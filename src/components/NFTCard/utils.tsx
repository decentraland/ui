import React from 'react'
import { BodyShape, NFT, NFTCategory, Rarity } from '@dcl/schemas'
import { Profile } from '../Profile/Profile'
import { Badge, NFTCardI18N } from './NFTCard.types'

const DEFAULT_BADGE_COLOR = '#37333d'

function _getEmoteBadges(emote: NFT['data']['emote'], i18n: NFTCardI18N) {
  return [
    { color: Rarity.getColor(emote.rarity), label: emote.rarity },
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
  return [
    { color: Rarity.getColor(wearable.rarity), label: wearable.rarity },
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
      const emote = nft.data.emote
      return _getEmoteBadges(emote, i18n)
    case NFTCategory.WEARABLE:
      const wearable = nft.data.wearable
      return _getWearableBadges(wearable, i18n)
    case NFTCategory.ESTATE:
      const estate = nft.data.estate
      return _getEstateBadges(estate)
    case NFTCategory.PARCEL:
      const parcel = nft.data.parcel
      return _getParcelBadges(parcel)
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
