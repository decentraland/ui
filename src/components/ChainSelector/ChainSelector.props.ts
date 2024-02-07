import { ChainId } from '@dcl/schemas'

export type ChainSelectorProps = {
  selectedChain: ChainId
  chainBeingConfirmed?: ChainId
  chains: ChainId[]
  onSelectChain: (chain: ChainId) => void
  i18n: ChainSelectori18n
}

export type ChainSelectori18n = {
  title: React.ReactNode
  connected: React.ReactNode
  confirmInWallet: React.ReactNode
}
