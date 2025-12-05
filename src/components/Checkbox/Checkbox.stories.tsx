import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from './Checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'Checkbox',
  component: Checkbox,
}

export default meta
type Story = StoryObj<typeof Checkbox>

export const Checked: Story = {
  render: () => <Checkbox checked={true} label="Yes" />,
}

export const Unchecked: Story = {
  render: () => <Checkbox checked={false} label="Yes" />,
}

export const Toggle: Story = {
  render: () => <Checkbox toggle label="ON SALE" />,
}
