import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { StarWalletIcon } from './StarWalletIcon'

const meta: Meta<typeof StarWalletIcon> = {
  title: 'StarWalletIcon',
  component: StarWalletIcon
}

export default meta
type Story = StoryObj<typeof StarWalletIcon>

export const Icon: Story = {
  render: () => <StarWalletIcon />
}
