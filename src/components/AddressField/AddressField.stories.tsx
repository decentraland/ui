import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import AddressField from './AddressField'

const meta: Meta<typeof AddressField> = {
  title: 'AddressField',
  component: AddressField,
  parameters: {
    layout: 'centered'
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <>
      <AddressField
        label="Address"
        placeholder="0x..."
        value="0x68FFc53C43C65C8Dd778969320e21B85b10363cE"
        resolveName={async (address: string) => address}
      />
    </>
  )
}

export const Error: Story = {
  render: () => (
    <>
      <AddressField
        label="Address"
        placeholder="0x..."
        value="0x68FFc53C43C65C8Dd778969320e21B85b10363cE"
        error={true}
        message="Invalid address"
        resolveName={async (address: string) => address}
      />
    </>
  )
}

export const Loading: Story = {
  render: () => (
    <>
      <AddressField
        label="Address"
        placeholder="0x..."
        value="0x68FFc53C43C65C8Dd778969320e21B85b10363cE"
        loading={true}
        resolveName={async (address: string) => address}
      />
    </>
  )
}
