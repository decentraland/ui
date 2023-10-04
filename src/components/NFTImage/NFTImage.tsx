import React, { useCallback, useMemo } from 'react'
import classNames from 'classnames'
import { NFTCategory, Rarity } from '@dcl/schemas'
import { Atlas, Layer } from '../Atlas/Atlas'
import { Props } from './NFTImage.types'
import './NFTImage.css'
import { getEstateCenter } from './utils'

function NFTImage({ nft, className }: Props) {
  if (
    nft.category === NFTCategory.WEARABLE ||
    nft.category === NFTCategory.EMOTE
  ) {
    const rarity =
      nft.category === NFTCategory.EMOTE
        ? nft.data.emote.rarity
        : nft.data.wearable.rarity
    const [light, dark] = Rarity.getGradient(rarity)
    return (
      <div
        className={classNames('dui-nft-image', className)}
        style={{ backgroundImage: `radial-gradient(${light}, ${dark})` }}
      >
        <img className="dui-nft-image__image" src={nft.image} alt={nft.name} />
      </div>
    )
  }

  if (nft.category === NFTCategory.ENS) {
    return (
      <div className={classNames('dui-nft-image--ens', className)}>
        <span className=".dui-nft-image__subdomain">
          {nft.data.ens.subdomain}
        </span>
      </div>
    )
  }

  if (nft.category === NFTCategory.ESTATE) {
    const parcels = nft.data.estate.parcels
    const [estateX, estateY] = useMemo(
      () => getEstateCenter(parcels),
      [parcels]
    )

    const selectedEstateStrokeLayer: Layer = useCallback(
      (tileX, tileY) => {
        return parcels.some(({ x, y }) => tileX === x && y === tileY)
          ? { color: '#ff0044', scale: 1.4 }
          : null
      },
      [parcels]
    )

    const selectedEstateFillLayer: Layer = useCallback(
      (tileX, tileY) => {
        return parcels.some(({ x, y }) => tileX === x && y === tileY)
          ? { color: '#ff9990', scale: 1.2 }
          : null
      },
      [parcels]
    )

    return (
      <div className={classNames('dui-nft-image--atlas', className)}>
        <Atlas
          className={className}
          x={estateX}
          y={estateY}
          isDraggable={false}
          layers={[selectedEstateStrokeLayer, selectedEstateFillLayer]}
        />
      </div>
    )
  }

  if (nft.category === NFTCategory.PARCEL) {
    const x = Number(nft.data.parcel.x)
    const y = Number(nft.data.parcel.y)
    const selectedStrokeLayer: Layer = useCallback(
      (tileX, tileY) => {
        return x === tileX && y === tileY
          ? { color: '#ff0044', scale: 1.4 }
          : null
      },
      [x, y]
    )

    const selectedFillLayer: Layer = useCallback(
      (tileX, tileY) => {
        return x === tileX && y === tileY
          ? { color: '#ff9990', scale: 1.2 }
          : null
      },
      [x, y]
    )

    return (
      <div className={classNames('dui-nft-image--atlas', className)}>
        <Atlas
          className={className}
          x={x}
          y={y}
          isDraggable={false}
          layers={[selectedStrokeLayer, selectedFillLayer]}
        />
      </div>
    )
  }

  return null
}

export default React.memo(NFTImage)
