import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Pagination from './Pagination'

const meta: Meta<typeof Pagination> = {
  title: 'Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered'
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const FivePages: Story = {
  render: () => (
    <Pagination
      defaultActivePage={2}
      totalPages={5}
      firstItem={null}
      lastItem={null}
    />
  )
}

export const ThousandPages: Story = {
  render: () => (
    <Pagination
      defaultActivePage={77}
      totalPages={1000}
      firstItem={null}
      lastItem={null}
    />
  )
}
