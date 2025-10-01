import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { TextFilter } from './TextFilter'

function generateValueAndChangeFunction() {
  const result = {
    fieldValue: undefined
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any

  result.onChange = (value) => {
    result.fieldValue = value
  }

  return result
}

const firstExample = generateValueAndChangeFunction()

const meta: Meta<typeof TextFilter> = {
  title: 'TextFilter',
  component: TextFilter,
  parameters: {
    layout: 'centered'
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const BasicFilter: Story = {
  render: () => (
    <TextFilter
      placeholder="This is a placeholder"
      value={firstExample.value}
      onChange={firstExample.onChange}
    />
  )
}

export const BasicFilterWithAName: Story = {
  render: () => (
    <TextFilter
      placeholder="This is a placeholder"
      label="This is a label"
      value={firstExample.value}
      onChange={firstExample.onChange}
    />
  )
}
