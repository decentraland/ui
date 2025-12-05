import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Pagination } from './Pagination'

const meta: Meta<typeof Pagination> = {
  title: 'Pagination',
  component: Pagination
}

export default meta
type Story = StoryObj<typeof Pagination>

export const Pages5: Story = {
  render: () => (
    <Pagination
      defaultActivePage={2}
      totalPages={5}
      firstItem={null}
      lastItem={null}
    />
  )
}

export const Pages1000: Story = {
  render: () => (
    <Pagination
      defaultActivePage={77}
      totalPages={1000}
      firstItem={null}
      lastItem={null}
    />
  )
}
