import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { WalletIcon } from './WalletIcon'

const meta: Meta<typeof WalletIcon> = {
  title: 'WalletIcon',
  component: WalletIcon,
  parameters: {
    layout: 'centered'
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Icon: Story = {
  render: () => <WalletIcon />
}
