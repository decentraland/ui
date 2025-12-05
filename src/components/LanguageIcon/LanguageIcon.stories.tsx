import type { Meta, StoryObj } from '@storybook/react'

import { LanguageIcon } from './LanguageIcon'
import './LanguageIcon.stories.css'

const meta: Meta<typeof LanguageIcon> = {
  title: 'LanguageIcon',
  component: LanguageIcon,
}

export default meta
type Story = StoryObj<typeof LanguageIcon>

export const Single: Story = {
  render: () => <LanguageIcon locale="en" />,
}

export const Options: Story = {
  render: () => (
    <div className="LanguageIcon-story">
      <LanguageIcon locale="en" label="English" />
      <LanguageIcon locale="es" label="Spanish" />
      <LanguageIcon locale="fr" label="French" />
      <LanguageIcon locale="ja" label="Japanese" />
      <LanguageIcon locale="zh" label="Chinese" />
      <LanguageIcon locale="ko" label="Korean" />
    </div>
  ),
}
