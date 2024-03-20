import React from 'react'

export type Props = {
  className?: string
  icon?:
    | 'BaseMale'
    | 'BaseFemale'
    | 'Unisex'
    | 'body_shape'
    | 'earring'
    | 'eyebrows'
    | 'eyes'
    | 'eyewear'
    | 'facial_hair'
    | 'feet'
    | 'hair'
    | 'hat'
    | 'helmet'
    | 'lower_body'
    | 'mask'
    | 'mouth'
    | 'tiara'
    | 'top_head'
    | 'upper_body'
    | 'skin'
    | 'hands_wear'
    | 'play-once'
    | 'play-loop'
    | 'smart-wearable'
    | 'sound'
    | 'props'
    | 'sparkles'
    | 'places'
  text: string
  onClick?: () => void
  children?: React.ReactNode
}
