import React, { useMemo } from 'react'
import { Network, Rarity, Item } from '@dcl/schemas'
import { WearablePreview } from '../WearablePreview'
import { Mana } from '../Mana/Mana'
import { Card } from '../Card/Card'
import { Profile } from '../Profile/Profile'
import { formatWeiToAssetCard, getCatalogCardInformation } from './utils'
import './AssetCard.css'

export type AssetCardTranslations = {
  also_minting: string
  available_for_mint: string
  available_listings_in_range: string
  cheapest_listing: string
  cheapest_option_range: string
  cheapest_option: string
  listing: string
  listings: string
  most_expensive_range: string
  most_expensive: string
  not_for_sale: string
  owners: string
  owner: string
}

export type AssetCardFilters = {
  price?: number
  sortBy?: string
  minPrice?: string
  maxPrice?: string
}

export type AssetCardProps = {
  translations: AssetCardTranslations
  asset: Item
  assetFilters: AssetCardFilters
  onClickCardURL: string
}

export const AssetCard = (props: AssetCardProps) => {
  const { asset, translations, onClickCardURL, assetFilters } = props

  const catalogItemInformation = useMemo(() => {
    return getCatalogCardInformation(asset, translations, assetFilters)
    return null
  }, [asset])

  const isAvailableForMint = asset.isOnSale && asset.available > 0
  const notForSale = !isAvailableForMint && !asset.minListingPrice

  return (
    <div>
      <Card
        className={'AssetCard'}
        link
        as={'a'}
        to={`${onClickCardURL}${asset.url}`}
        id={asset.itemId}
      >
        {asset ? (
          <>
            <WearablePreview
              contractAddress={asset.contractAddress}
              itemId={asset.itemId}
              tokenId={asset.contractAddress}
              dev={true}
            />
            {/* TODO: favorites counter */}
            <Card.Content
              data-testid="asset-card-content"
              className={'catalog'}
            >
              <Card.Header>
                <div className={'catalogTitle'}>
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
                  className={`${'extraInformation'} ${
                    notForSale ? 'NotForSale' : ''
                  }`}
                >
                  {console.log('flo a ver', catalogItemInformation)}
                  <span>{catalogItemInformation.action}</span>
                  {catalogItemInformation.actionIcon && (
                    <div className={'mintIcon'} />
                  )}
                </span>

                {catalogItemInformation.price ? (
                  <div className={'PriceInMana'}>
                    <Mana
                      size="large"
                      network={asset.network}
                      className={'PriceInMana'}
                    >
                      {catalogItemInformation.price?.includes('-')
                        ? `${formatWeiToAssetCard(
                            catalogItemInformation.price.split(' - ')[0]
                          )} - ${formatWeiToAssetCard(
                            catalogItemInformation.price.split(' - ')[1]
                          )}`
                        : formatWeiToAssetCard(catalogItemInformation.price)}
                    </Mana>
                  </div>
                ) : (
                  `${asset.owners} ${
                    asset.owners === 1
                      ? translations.owner
                      : translations.owners
                  }`
                )}
                {catalogItemInformation.extraInformation && (
                  <span className={'extraInformation'}>
                    {catalogItemInformation.extraInformation}
                  </span>
                )}
              </div>
              <div
                className={'badge'}
                style={{
                  backgroundColor: Rarity.getColor(asset.rarity)
                }}
                title={asset.rarity}
                onClick={() => null}
              >
                <span className={'text'}>{asset.rarity}</span>
              </div>
              {/* {emote ? <EmoteTags asset={asset} /> : null} */}
            </Card.Content>
          </>
        ) : null}
      </Card>
    </div>
  )
}
