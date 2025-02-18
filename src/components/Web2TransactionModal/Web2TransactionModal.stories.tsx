import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Web2TransactionModal } from './Web2TransactionModal'
import { ChainId } from '@dcl/schemas'

export default {
  title: 'Web2TransactionModal',
  component: Web2TransactionModal
} as ComponentMeta<typeof Web2TransactionModal>

const Template: ComponentStory<typeof Web2TransactionModal> = (args) => (
  <Web2TransactionModal {...args} />
)

export const Basic = Template.bind({})
Basic.args = {
  isBalanceEnough: false,
  transactionCostAmount: '0.005',
  userBalanceAmount: '1',
  chainId: ChainId.ETHEREUM_MAINNET,
  isOpen: true,
  onAccept: () => console.log('accept'),
  onClose: () => console.log('close'),
  onReject: () => console.log('reject')
}
