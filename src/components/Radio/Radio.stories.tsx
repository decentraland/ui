import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Radio } from 'semantic-ui-react'
import { Row } from '../Row/Row'

const meta: Meta<typeof Radio> = {
  title: 'Radio',
  component: Radio,
  parameters: {
    layout: 'centered'
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Checked: Story = {
  render: () => (
    <>
      <Radio checked={true} label="Yes" />
    </>
  )
}

export const Unchecked: Story = {
  render: () => (
    <>
      <Radio checked={false} label="No" />
    </>
  )
}

export const Options: Story = {
  render: () => (
    <Row stacked>
      <Radio checked={true} label="Yes" />
      <Radio checked={false} label="No" />
      <Radio label="Abstain" />
    </Row>
  )
}

export const Toggle: Story = {
  render: () => (
    <>
      <Radio toggle label="ON SALE" />
    </>
  )
}
