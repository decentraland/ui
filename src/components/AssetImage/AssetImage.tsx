import React from 'react'
import { Rarity } from '@dcl/schemas/dist/dapps/rarity'
import './AssetImage.css'

export type AssetImageProps = {
  name: string
  rarity: Rarity
  src: string
}

export const AssetImage = (props: AssetImageProps) => {
  const { name, rarity, src } = props

  const [light, dark] = Rarity.getGradient(rarity)
  const backgroundImage = `radial-gradient(${light}, ${dark})`

  return (
    <div
      className={'AssetImage'}
      style={{
        backgroundImage
      }}
    >
      <img alt={name} className="image" src={src} />
    </div>
  )
}
