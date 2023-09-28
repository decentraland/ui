import { AssetStatus } from './AssetStatusFilter.types'

export const i18n = {
  title: 'Status',
  status: {
    [AssetStatus.NOT_FOR_SALE]: 'Not For Sale',
    [AssetStatus.ONLY_LISTING]: 'Only Listings',
    [AssetStatus.ONLY_MINTING]: 'Only Available For Minting',
    [AssetStatus.ON_SALE]: 'On Sale'
  },
  tooltips: {
    [AssetStatus.NOT_FOR_SALE]:
      'Only includes items that are not being available for minting (buying directly from the creators) nor with available listings.',
    [AssetStatus.ONLY_LISTING]: 'Only includes items that are being resold.',
    [AssetStatus.ONLY_MINTING]:
      'Only includes items that are available for minting (buying directly from the creators).',
    [AssetStatus.ON_SALE]:
      'Includes items available for minting and/or with available listings.'
  }
}
