export enum AssetStatus {
  ON_SALE = 'on_sale',
  ONLY_MINTING = 'only_minting',
  ONLY_LISTING = 'only_listing',
  NOT_FOR_SALE = 'not_for_sale'
}

export type AssetStatusFilterProps = {
  className?: string
  value: AssetStatus
  i18n: {
    status: {
      [keyof in AssetStatus]: string
    }
    tooltips: {
      [keyof in AssetStatus]: string
    }
    title: string
  }
  onChange: (value: AssetStatus) => void
  defaultCollapsed?: boolean
}
