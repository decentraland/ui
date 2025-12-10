import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Header } from './Header'

const meta: Meta<typeof Header> = {
  title: 'Header',
  component: Header
}

export default meta
type Story = StoryObj<typeof Header>

export const SubheaderHeader: Story = {
  render: () => (
    <>
      <Header sub>Votes</Header>
      <Header>20,212</Header>
    </>
  )
}

export const Sizes: Story = {
  render: () => (
    <>
      <Header size="huge">Huge</Header>
      <Header size="large">Large</Header>
      <Header size="medium">Medium</Header>
      <Header size="small">Small</Header>
      <Header size="tiny">Tiny</Header>
    </>
  )
}
