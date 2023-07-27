import React from 'react'
import { BigNumber, ethers } from 'ethers'
import { Item } from '@dcl/schemas/dist/dapps/item'
import { CatalogSortBy } from '@dcl/schemas'
import { AssetCardFilters, AssetCardTranslations } from './AssetCard'

export type CatalogCardInformation = {
  action: string
  actionIcon: string | null
  price: string | null
  extraInformation: React.ReactElement | null
}

const formatter = Intl.NumberFormat('en', { notation: 'compact' })

export function formatWeiToAssetCard(wei: string): string {
  const maximumFractionDigits = 2
  const value = Number(ethers.utils.formatEther(wei))

  if (value === 0) {
    return '0'
  }

  const fixedValue = value.toLocaleString(undefined, {
    maximumFractionDigits
  })

  if (fixedValue === '0') {
    return Math.pow(10, -maximumFractionDigits).toString()
  }

  return formatter.format(value)
}

function getAlsoAvailableForMintingText(asset: Item, text: string) {
  return (
    <span>
      {text}:&nbsp;
      {formatWeiToAssetCard(asset.price)}
    </span>
  )
}

function getListingsRangePrice(asset: Item) {
  return `${asset.minListingPrice} - ${asset.maxListingPrice}`
}

function getIsMintPriceInRange(asset: Item, appliedFilters: AssetCardFilters) {
  return (
    (!appliedFilters.minPrice ||
      BigNumber.from(asset.price).gte(
        ethers.utils.parseUnits(appliedFilters.minPrice)
      )) &&
    (!appliedFilters.maxPrice ||
      BigNumber.from(asset.price).lte(
        ethers.utils.parseUnits(appliedFilters.maxPrice)
      ))
  )
}

function getAssetListingsRangeInfoText(
  asset: Item,
  translations: AssetCardTranslations
) {
  return asset.minListingPrice && asset.maxListingPrice ? (
    <span className={'wrapBigText'}>
      {asset.listings}
      {asset.listings === 1 ? translations.listing : translations.listings}
      :&nbsp;
      <span>
        {formatWeiToAssetCard(asset.minListingPrice)}
        &nbsp;
        {!!asset.listings &&
          asset.listings > 1 &&
          asset.minListingPrice !== asset.maxListingPrice &&
          `- ${formatWeiToAssetCard(asset.maxListingPrice)}`}
      </span>
    </span>
  ) : null
}

export function getCatalogCardInformation(
  asset: Item,
  translations: AssetCardTranslations,
  appliedFilters: AssetCardFilters
): CatalogCardInformation {
  const { sortBy = CatalogSortBy.CHEAPEST } = appliedFilters

  const isAvailableForMint = asset.isOnSale && asset.available > 0
  const hasListings = asset.listings && asset.listings > 0
  const hasOnlyListings = hasListings && !isAvailableForMint
  const hasOnlyMint = isAvailableForMint && !hasListings
  const notForSale = !isAvailableForMint && !hasListings
  const hasRangeApplied = !!appliedFilters.minPrice || !!appliedFilters.maxPrice

  if (notForSale) {
    return {
      action: translations.not_for_sale,
      actionIcon: null,
      price: null,
      extraInformation: null
    }
  }

  if (sortBy === CatalogSortBy.CHEAPEST) {
    const info: CatalogCardInformation = {
      action: hasRangeApplied
        ? translations.cheapest_option_range
        : translations.cheapest_option,
      actionIcon: null,
      price: asset.minPrice ?? null,
      extraInformation: null
    }

    if (hasOnlyMint) {
      info.extraInformation = null
    } else if (hasOnlyListings && asset.listings && asset.listings > 1) {
      info.extraInformation = getAssetListingsRangeInfoText(asset, translations)
    } else {
      // has both minting and listings
      if (hasRangeApplied) {
        info.price = asset.minPrice ?? asset.price
        if (appliedFilters.minPrice) {
          const isMintingLessThanMinPriceFilter = BigNumber.from(
            asset.price
          ).lt(ethers.utils.parseUnits(appliedFilters.minPrice))
          info.extraInformation = isMintingLessThanMinPriceFilter
            ? getAlsoAvailableForMintingText(
                asset,
                translations.available_for_mint
              )
            : null
        }
      } else {
        const mintIsNotCheapestOption = BigNumber.from(asset.price).gt(
          BigNumber.from(asset.minPrice)
        )
        if (mintIsNotCheapestOption) {
          info.extraInformation = getAlsoAvailableForMintingText(
            asset,
            translations.available_for_mint
          )
        }
      }
    }
    return info
  } else if (sortBy === CatalogSortBy.MOST_EXPENSIVE) {
    const info: CatalogCardInformation = {
      action: hasRangeApplied
        ? translations.most_expensive_range
        : translations.most_expensive,
      actionIcon: null,
      price: asset.price,
      extraInformation: getAssetListingsRangeInfoText(asset, translations)
    }

    const isMintingGreaterThanMaxListingPrice =
      !!asset.maxListingPrice &&
      BigNumber.from(asset.price).gt(BigNumber.from(asset.maxListingPrice))

    info.price =
      getIsMintPriceInRange(asset, appliedFilters) &&
      isMintingGreaterThanMaxListingPrice
        ? asset.price
        : asset.maxListingPrice ?? asset.price

    return info
  }

  // rest of filter without label logic
  const info: CatalogCardInformation = {
    action: '',
    actionIcon: null,
    price: asset.price,
    extraInformation: null
  }

  if (hasOnlyMint) {
    info.action = translations.available_for_mint
    info.actionIcon = 'mintingIcon'
  } else if (hasOnlyListings) {
    ;(info.action = hasRangeApplied
      ? translations.available_listings_in_range
      : translations.cheapest_listing),
      (info.price =
        asset.listings &&
        asset.listings > 1 &&
        asset.minListingPrice !== asset.maxListingPrice
          ? hasRangeApplied
            ? getListingsRangePrice(asset)
            : asset.minListingPrice ?? ''
          : asset.minPrice ?? '')
  } else {
    // both mint and listings available

    if (hasRangeApplied) {
      const isMintInRange = getIsMintPriceInRange(asset, appliedFilters)
      info.action = isMintInRange
        ? translations.available_for_mint
        : translations.available_listings_in_range
      info.price = isMintInRange ? asset.price : asset.minListingPrice ?? ''
      info.actionIcon = isMintInRange ? 'mintingIcon' : null
      info.extraInformation = isMintInRange
        ? getAssetListingsRangeInfoText(asset, translations)
        : null

      if (appliedFilters.minPrice) {
        const isMintingLessThanMinPriceFilter = BigNumber.from(asset.price).lt(
          ethers.utils.parseUnits(appliedFilters.minPrice)
        )
        info.extraInformation =
          !isMintInRange && isMintingLessThanMinPriceFilter
            ? getAlsoAvailableForMintingText(
                asset,
                translations.available_for_mint
              )
            : info.extraInformation
      }
    } else {
      // mint is the cheapest, show "available for mint" and the listings range
      info.action = translations.available_for_mint
      info.actionIcon = 'mintingIcon'
      info.extraInformation = getAssetListingsRangeInfoText(asset, translations)
    }
  }
  return info
}
