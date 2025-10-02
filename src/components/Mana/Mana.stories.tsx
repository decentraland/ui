import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Network } from '@dcl/schemas/dist/dapps/network'
import Header from '../Header/Header'
import { Mana } from './Mana'

const meta: Meta<typeof Mana> = {
  title: 'Mana',
  component: Mana,
  parameters: {
    layout: 'centered'
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Symbol: Story = {
  render: () => <Mana />
}

export const SymbolAndMANA: Story = {
  render: () => <Mana>MANA</Mana>
}

export const TotalVoted: Story = {
  render: () => (
    <>
      <Header sub>Total voted</Header>
      <Mana>1,235,345</Mana>
    </>
  )
}

export const Sizes: Story = {
  render: () => (
    <>
      <Mana size="huge">1,000</Mana>
      <Mana size="large">1,000</Mana>
      <Mana size="medium">1,000</Mana>
      <Mana size="small">1,000</Mana>
      <Mana size="tiny">1,000</Mana>
    </>
  )
}

export const InAParagraph: Story = {
  render: () => (
    <p>
      You've voted with <Mana inline>1,000</Mana>.
    </p>
  )
}

export const Matic: Story = {
  render: () => (
    <p>
      You deposited{' '}
      <Mana inline network={Network.MATIC}>
        1,000
      </Mana>{' '}
      into Matic Network.
    </p>
  )
}

export const MaticPrimary: Story = {
  render: () => (
    <p>
      You deposited{' '}
      <Mana inline network={Network.MATIC} primary>
        1,000
      </Mana>{' '}
      into Matic Network.
    </p>
  )
}

export const MaticSizes: Story = {
  render: () => (
    <>
      <Mana network={Network.MATIC} size="huge">
        1,000
      </Mana>
      <Mana network={Network.MATIC} size="large">
        1,000
      </Mana>
      <Mana network={Network.MATIC} size="medium">
        1,000
      </Mana>
      <Mana network={Network.MATIC} size="small">
        1,000
      </Mana>
      <Mana network={Network.MATIC} size="tiny">
        1,000
      </Mana>
    </>
  )
}

export const ManaAndTooltip: Story = {
  render: () => (
    <>
      <Mana showTooltip={true} network={Network.MATIC} size="small">
        1,000
      </Mana>
    </>
  )
}
