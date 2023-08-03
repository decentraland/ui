import React from 'react'
import classNames from 'classnames'
import { Network, Rarity, Item } from '@dcl/schemas'
import { Mana } from '../Mana/Mana'
import { Card } from '../Card/Card'
import { Profile } from '../Profile/Profile'
import './AssetCard.css'
import { AssetImage } from '../AssetImage/AssetImage'

export type AssetCardProps = {
  asset: Pick<Item, 'id' | 'url' | 'name' | 'rarity' | 'network' | 'creator'>
  action: React.ReactNode
  actionIcon?: React.ReactNode
  imagensrc: string
  extraInformation: React.ReactNode
  notForSale: boolean
  price?: string
  owners?: string
}

export const AssetCard = (props: AssetCardProps) => {
  const {
    action,
    actionIcon,
    asset,
    extraInformation,
    imagensrc,
    notForSale,
    owners,
    price
  } = props

  return (
    <Card className={'AssetCard'} link id={asset.id}>
      {asset ? (
        <>
          <AssetImage
            name={asset.name}
            rarity={asset.rarity}
            src={imagensrc}
            className={'catalog'}
          />
          <Card.Content data-testid="asset-card-content" className={'catalog'}>
            <Card.Header className="catalogHeader">
              <div className={'title'}>
                <span className={'textOverflow'}>{asset.name}</span>
                {asset.network === Network.MATIC && (
                  <span className={'creator'}>
                    <Profile address={asset.creator} textOnly />
                  </span>
                )}
              </div>
            </Card.Header>
            <div className={'CatalogItemInformation'}>
              <span
                className={classNames(
                  'extraInformation',
                  notForSale && 'NotForSale'
                )}
              >
                <span>{action}</span>:&nbsp;
                {actionIcon && <div className={'mintIcon'} />}
              </span>

              {price ? (
                <div className={'PriceInMana'}>
                  <Mana
                    size="large"
                    network={asset.network}
                    className={'PriceInMana'}
                  >
                    {price}
                  </Mana>
                </div>
              ) : (
                owners
              )}
              {extraInformation && (
                <span className={'extraInformation'}>{extraInformation}</span>
              )}
            </div>
            <div
              className={'badge'}
              style={{
                backgroundColor: Rarity.getColor(asset.rarity)
              }}
              title={asset.rarity}
            >
              <span className={'text'}>{asset.rarity}</span>
            </div>
          </Card.Content>
        </>
      ) : null}
    </Card>
  )
}
