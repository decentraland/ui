import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { TagField } from './TagField'

const meta: Meta<typeof TagField> = {
  title: 'TagField',
  component: TagField
}

export default meta
type Story = StoryObj<typeof TagField>

export const Basic: Story = {
  render: () => (
    <>
      <TagField
        label="Tags (optional)"
        placeholder="e.g. (outdoors furniture floor)"
      />
    </>
  )
}

export const OnChange: Story = {
  render: () => (
    <>
      <TagField
        label="Tags (optional)"
        placeholder="e.g. (outdoors furniture floor)"
        onChange={(_, props) => alert(JSON.stringify(props.value))}
      />
    </>
  )
}

export const Error: Story = {
  render: () => (
    <>
      <TagField
        label="Tags (optional)"
        placeholder="e.g. (outdoors furniture floor)"
        message="Something went wrong"
        error
      />
    </>
  )
}

export const DefaultValues: Story = {
  render: () => (
    <>
      <TagField
        label="Tags (optional)"
        placeholder="e.g. (outdoors furniture floor)"
        value={['genesis', 'city', 'town']}
      />
    </>
  )
}
