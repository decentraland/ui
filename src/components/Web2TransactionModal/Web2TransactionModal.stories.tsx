import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ChainId } from '@dcl/schemas'
import { Web2TransactionModal } from './Web2TransactionModal'

const meta: Meta<typeof Web2TransactionModal> = {
  title: 'Web2TransactionModal',
  component: Web2TransactionModal,
  parameters: {
    layout: 'centered'
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <>
      <Web2TransactionModal
        transactionCostAmount="0.005"
        userBalanceAmount="1"
        chainId={ChainId.ETHEREUM_MAINNET}
        isOpen={true}
        onAccept={() => undefined}
        onClose={() => undefined}
        onReject={() => undefined}
      />
    </>
  )
}
