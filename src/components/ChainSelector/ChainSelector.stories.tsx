import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { ChainSelector } from './ChainSelector'
import { ChainId } from '@dcl/schemas'

storiesOf('ChainSelector', module)
  .add('Basic', () => (
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
  ))
  .add('With chain being confirmed', () => (
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
  ))
