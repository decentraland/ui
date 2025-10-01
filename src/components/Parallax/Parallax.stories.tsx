import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Parallax } from './Parallax'
import './Parallax.stories.css'

const meta: Meta<typeof Parallax> = {
  title: 'Parallax',
  component: Parallax,
  parameters: {
    layout: 'centered'
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Depth: Story = {
  render: () => (
    <div className="Parallax-story">
      <Parallax>
        <Parallax.Layer depth={2}>
          <div className="square small" />
        </Parallax.Layer>
        <Parallax.Layer depth={8}>
          <div className="square medium" />
        </Parallax.Layer>
        <Parallax.Layer depth={14}>
          <div className="square large" />
        </Parallax.Layer>
      </Parallax>
    </div>
  )
}
