import classNames from 'classnames'
import React from 'react'
import { Rarity } from '@dcl/schemas/dist/dapps/rarity'
import './AssetImage.css'

export type AssetImageProps = {
  name: string
  rarity: Rarity
  src: string
  className?: string
}

export const AssetImage = (props: AssetImageProps) => {
  const { name, rarity, src, className } = props

  const [light, dark] = Rarity.getGradient(rarity)
  const backgroundImage = `radial-gradient(${light}, ${dark})`

  return (
    <div
      className={classNames('dui-asset-image', className)}
      style={{
        backgroundImage
      }}
    >
      <img alt={name} className="dui-asset-image__image" src={src} />
    </div>
  )
}
