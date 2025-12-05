import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon'
import { RangeField } from './RangeField'

const meta: Meta<typeof RangeField> = {
  title: 'RangeField',
  component: RangeField,
}

export default meta
type Story = StoryObj<typeof RangeField>

export const Simple: Story = {
  render: () => (
    <RangeField value={[]} onChange={(params) => console.log(params)} />
  ),
}

export const CustomLabels: Story = {
  render: () => (
    <RangeField
      minLabel="MIN PRICE"
      maxLabel="MAX PRICE"
      onChange={(params) => console.log(params)}
      value={['2', '4']}
    />
  ),
}

export const WithMinMaxLimits: Story = {
  render: () => (
    <RangeField
      rangeLimitMin={0}
      rangeLimitMax={6}
      onChange={(params) => console.log(params)}
      value={['2', '4']}
    />
  ),
}

export const WithCustomProps: Story = {
  render: () => (
    <RangeField
      rangeLimitMin={0}
      rangeLimitMax={6}
      onChange={(params) => console.log(params)}
      value={['2', '4']}
      minProps={{ icon: <Icon name="search" />, iconPosition: 'left' }}
    />
  ),
}
