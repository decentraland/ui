import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Footer } from './Footer'
import './Footer.stories.css'

const meta: Meta<typeof Footer> = {
  title: 'Footer',
  component: Footer,
  parameters: {
    layout: 'centered'
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Uncontrolled: Story = {
  render: () => <Footer />
}

export const Controlled: Story = {
  render: () => (
    <Footer locale="en" locales={['en', 'es', 'fr', 'ja', 'ko', 'zh']} />
  )
}

export const FullWidthInnerContainer: Story = {
  render: () => (
    <div className="Footer-fullwidth-container">
      <Footer isFullWidth />
    </div>
  )
}

export const WithoutTheSocialLinks: Story = {
  render: () => <Footer hideSocialLinks />
}
