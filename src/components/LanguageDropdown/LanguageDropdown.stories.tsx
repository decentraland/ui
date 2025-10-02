import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { LanguageDropdown } from './LanguageDropdown'

const meta: Meta<typeof LanguageDropdown> = {
  title: 'LanguageDropdown',
  component: LanguageDropdown,
  parameters: {
    layout: 'centered'
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const UncontrolledLeftDownward: Story = {
  render: () => (
    <LanguageDropdown locales={['en', 'es', 'fr', 'zh', 'ko', 'ja']} />
  )
}

export const ControlledRightUpward: Story = {
  render: () => (
    <LanguageDropdown
      locale="zh"
      direction="right"
      upward
      locales={['zh', 'ko', 'ja']}
    />
  )
}
