import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Filter } from './Filter'

const meta: Meta<typeof Filter> = {
  title: 'Filter',
  component: Filter,
  parameters: {
    layout: 'centered'
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const OneActive: Story = {
  render: () => (
    <>
      <Filter active>2 Parcels</Filter>
      <Filter>1 Estate</Filter>
      <Filter>1 Contributions</Filter>
      <Filter>1 Mortgage</Filter>
    </>
  )
}
