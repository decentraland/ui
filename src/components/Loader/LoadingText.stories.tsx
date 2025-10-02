import * as React from 'react'

import type { Meta, StoryObj } from '@storybook/react'
import LoadingText from './LoadingText'

import './LoadingText.stories.css'

const meta: Meta<typeof LoadingText> = {
  title: 'LoadingText',
  component: LoadingText,
  parameters: {
    layout: 'centered'
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const h1Small: Story = {
  render: () => (
    <div className="loading-container">
      <LoadingText type="h1" size="small" />
    </div>
  )
}

export const h2Medium: Story = {
  render: () => (
    <div className="loading-container">
      <LoadingText type="h2" size="medium" />
    </div>
  )
}

export const h3Large: Story = {
  render: () => (
    <div className="loading-container">
      <LoadingText type="h3" size="large" />
    </div>
  )
}

export const spanFull: Story = {
  render: () => (
    <div className="loading-container">
      <LoadingText type="span" size="full" />
    </div>
  )
}

export const pFull2Lines: Story = {
  render: () => (
    <div className="loading-container">
      <LoadingText type="p" size="full" lines={2} />
    </div>
  )
}
