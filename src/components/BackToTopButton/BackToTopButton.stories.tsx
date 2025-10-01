import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import BackToTopButton from './BackToTopButton'

const meta: Meta<typeof BackToTopButton> = {
  title: 'BackToTopButton',
  component: BackToTopButton,
  argTypes: {
    threshold: { action: 'clicked' }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: (args) => (
    <>
      <div style={{ height: 8000, backgroundColor: '#3d3b43', width: 500 }}>
        <span> Scroll down to see the button...</span>
      </div>
      <BackToTopButton {...args} />
    </>
  ),
  args: {
    threshold: 400
  }
}
