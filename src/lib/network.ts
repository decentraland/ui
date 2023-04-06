import { Network } from '@dcl/schemas'

export type NetworksNames = {
  [key in Network]: string
}

export const networksNames: NetworksNames = {
  [Network.ETHEREUM]: 'Ethereum',
  [Network.MATIC]: 'Polygon'
}

export const getNetworkName = (network: Network) => networksNames[network]
