import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { StarWalletIcon } from './StarWalletIcon'

const meta: Meta<typeof StarWalletIcon> = {
  title: 'StarWalletIcon',
  component: StarWalletIcon,
  parameters: {
    layout: 'centered'
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Icon: Story = {
  render: () => <StarWalletIcon />
}
