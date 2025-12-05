import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Radio } from './Radio'
import { Row } from '../Row/Row'

const meta: Meta<typeof Radio> = {
  title: 'Radio',
  component: Radio,
}

export default meta
type Story = StoryObj<typeof Radio>

export const Checked: Story = {
  render: () => (
    <>
      <Radio checked={true} label="Yes" />
    </>
  ),
}

export const Unchecked: Story = {
  render: () => (
    <>
      <Radio checked={false} label="No" />
    </>
  ),
}

export const Options: Story = {
  render: () => (
    <Row stacked>
      <Radio checked={true} label="Yes" />
      <Radio checked={false} label="No" />
      <Radio label="Abstain" />
    </Row>
  ),
}

export const Toggle: Story = {
  render: () => (
    <>
      <Radio toggle label="ON SALE" />
    </>
  ),
}
