import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ChainSelector } from './ChainSelector'
import { ChainId } from '@dcl/schemas'

const meta: Meta<typeof ChainSelector> = {
  title: 'ChainSelector',
  component: ChainSelector,
  parameters: {
    layout: 'centered'
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <ChainSelector
      chains={[
        ChainId.ETHEREUM_MAINNET,
        ChainId.MATIC_MAINNET,
        ChainId.ARBITRUM_MAINNET,
        ChainId.OPTIMISM_MAINNET,
        ChainId.BSC_MAINNET,
        ChainId.FANTOM_MAINNET,
        ChainId.AVALANCHE_MAINNET
      ]}
      onSelectChain={(chain) => console.log(chain)}
      selectedChain={ChainId.ETHEREUM_MAINNET}
      i18n={{
        title: 'Select Network',
        connected: 'Connected',
        confirmInWallet: 'Confirm in wallet'
      }}
    />
  )
}

export const WithChainBeingConfirmed: Story = {
  render: () => (
    <ChainSelector
      chains={[
        ChainId.ETHEREUM_MAINNET,
        ChainId.MATIC_MAINNET,
        ChainId.ARBITRUM_MAINNET,
        ChainId.OPTIMISM_MAINNET
      ]}
      onSelectChain={(chain) => console.log(chain)}
      selectedChain={ChainId.ETHEREUM_MAINNET}
      chainBeingConfirmed={ChainId.MATIC_MAINNET}
      i18n={{
        title: 'Select Network',
        connected: 'Connected',
        confirmInWallet: 'Confirm in wallet'
      }}
    />
  )
}
