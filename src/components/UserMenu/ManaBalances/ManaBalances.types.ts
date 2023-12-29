import * as React from 'react'
import { Network } from '@dcl/schemas/dist/dapps/network'

export type ManaBalancesProps = {
  manaBalances?: Partial<Record<Network, number>>
  onClickBalance?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    network: Network
  ) => void
}
