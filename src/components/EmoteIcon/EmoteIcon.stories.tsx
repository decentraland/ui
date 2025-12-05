import type { Meta, StoryObj } from '@storybook/react'
import { EmoteIcon } from './EmoteIcon'

const meta: Meta<typeof EmoteIcon> = {
  title: 'EmoteIcon',
  component: EmoteIcon,
}

export default meta
type Story = StoryObj<typeof EmoteIcon>

export const Icon: Story = {
  render: () => <EmoteIcon />,
}
