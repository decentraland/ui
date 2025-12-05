import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Address } from '../Address/Address'
import { Box } from './Box'
import { Blockie } from '../Blockie/Blockie'

const address = '0x0F5D2fB29fb7d3CFeE444a200298f468908cC942'

const meta: Meta<typeof Box> = {
  title: 'Box',
  component: Box
}

export default meta
type Story = StoryObj<typeof Box>

export const WithoutHeader: Story = {
  render: () => (
    <Box>
      <Blockie seed={address}>
        <Address value={address} strong />
      </Blockie>
    </Box>
  )
}

export const WithHeader: Story = {
  render: () => (
    <Box header="Children with header">
      <Blockie seed={address}>
        <Address value={address} strong />
      </Blockie>
    </Box>
  )
}

export const WithoutBorder: Story = {
  render: () => (
    <Box header="Without border" borderless>
      <Blockie seed={address}>
        <Address value={address} strong />
      </Blockie>
    </Box>
  )
}

export const Collapsible: Story = {
  render: () => (
    <Box header="Without border" collapsible>
      <Blockie seed={address}>
        <Address value={address} strong />
      </Blockie>
    </Box>
  )
}

export const Collapsed: Story = {
  render: () => (
    <Box header="Without border" collapsible collapsed>
      <Blockie seed={address}>
        <Address value={address} strong />
      </Blockie>
    </Box>
  )
}
