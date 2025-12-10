import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { WalletIcon } from './WalletIcon'

const meta: Meta<typeof WalletIcon> = {
  title: 'WalletIcon',
  component: WalletIcon
}

export default meta
type Story = StoryObj<typeof WalletIcon>

export const Icon: Story = {
  render: () => <WalletIcon />
}
