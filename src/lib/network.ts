import { Network } from '@dcl/schemas'

export type NetworksNames = {
  [key in Network]: string
}

export const networksNames: NetworksNames = {
  [Network.ETHEREUM]: 'Ethereum',
  [Network.MATIC]: 'Polygon'
}

export const getNetworkName = (network: Network): string | undefined =>
  networksNames[network]

export const getNetworkMANADescription = (
  network: Network
): string | undefined => {
  const networkName = getNetworkName(network)
  return networkName ? `${networkName} MANA` : 'MANA'
}
