import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Empty } from './Empty'
import { Page } from '../Page/Page'

const meta: Meta<typeof Empty> = {
  title: 'Empty',
  component: Empty,
}

export default meta
type Story = StoryObj<typeof Empty>

export const Example: Story = {
  render: () => (
    <Page>
      <Empty>No results...</Empty>
    </Page>
  ),
}

export const WithLink: Story = {
  render: () => (
    <Page>
      <Empty>
        <span>
          Your Scenes were uploaded to the Cloud. <a>Sign In</a> to load them
          back.
        </span>
      </Empty>
    </Page>
  ),
}

export const FixedHeight: Story = {
  render: () => (
    <Page>
      <Empty height={100}>This has a fixed height.</Empty>
    </Page>
  ),
}

export const Expand: Story = {
  render: () => (
    <Page>
      <Empty expand>
        <span>This expands to fill the parent.</span>
      </Empty>
    </Page>
  ),
}
