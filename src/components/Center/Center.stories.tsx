import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Center } from './Center'
import './Center.stories.css'

const meta: Meta<typeof Center> = {
  title: 'Center',
  component: Center,
}

export default meta
type Story = StoryObj<typeof Center>

export const OnParent: Story = {
  render: () => (
    <>
      <div className="story-container" />
      <div className="story-container">
        <Center>
          <span className="hello">Hello</span>
        </Center>
      </div>
    </>
  ),
}

export const OnScreen: Story = {
  render: () => (
    <>
      <div className="story-container" />
      <div className="story-container">
        <Center screen>
          <span className="hello">Hello</span>
        </Center>
      </div>
    </>
  ),
}
