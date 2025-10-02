import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { SelectField } from './SelectField'

const meta: Meta<typeof SelectField> = {
  title: 'SelectField',
  component: SelectField,
  parameters: {
    layout: 'centered'
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <>
      <SelectField
        label="Label"
        placeholder="Placeholder"
        options={[
          { key: 1, text: 'Choice 1', value: 1 },
          { key: 2, text: 'Choice 2', value: 2 },
          { key: 3, text: 'Choice 3', value: 3 }
        ]}
        onChange={(_, a) => console.log(a)}
      />
    </>
  )
}

export const Message: Story = {
  render: () => (
    <SelectField
      label="Label"
      placeholder="Placeholder"
      message="Additional comment"
      options={[
        { key: 1, text: 'Choice 1', value: 1 },
        { key: 2, text: 'Choice 2', value: 2 },
        { key: 3, text: 'Choice 3', value: 3 }
      ]}
      onChange={(_, a) => console.log(a)}
    />
  )
}

export const Error: Story = {
  render: () => (
    <SelectField
      label="Label"
      placeholder="Placeholder"
      message="Some warning"
      error
      options={[
        { key: 1, text: 'Choice 1', value: 1 },
        { key: 2, text: 'Choice 2', value: 2 },
        { key: 3, text: 'Choice 3', value: 3 }
      ]}
      onChange={(_, a) => console.log(a)}
    />
  )
}

export const DisabledOptions: Story = {
  render: () => (
    <>
      <SelectField
        label="Label"
        placeholder="Placeholder"
        options={[
          { key: 1, text: 'Choice 1', value: 1 },
          { key: 2, text: 'Choice 2', value: 2, disabled: true },
          { key: 3, text: 'Choice 3', value: 3 },
          { key: 4, text: 'Choice 4', value: 4, disabled: true }
        ]}
        onChange={(_, a) => console.log(a)}
      />
    </>
  )
}

export const DisabledField: Story = {
  render: () => (
    <>
      <SelectField
        label="Label"
        placeholder="Placeholder"
        options={[
          { key: 1, text: 'Choice 1', value: 1 },
          { key: 2, text: 'Choice 2', value: 2, disabled: true },
          { key: 3, text: 'Choice 3', value: 3 },
          { key: 4, text: 'Choice 4', value: 4, disabled: true }
        ]}
        disabled
      />
    </>
  )
}

export const DefaultOption: Story = {
  render: () => (
    <>
      <SelectField
        label="Label"
        placeholder="Placeholder"
        options={[
          { key: 1, text: 'Choice 1', value: 8 },
          { key: 2, text: 'Choice 2', value: 2, disabled: true },
          { key: 3, text: 'Choice 3', value: 3 },
          { key: 4, text: 'Choice 4', value: 4, disabled: true }
        ]}
        defaultValue={8}
      />
    </>
  )
}

export const WithHeader: Story = {
  render: () => (
    <>
      <SelectField
        label="Label"
        placeholder="Placeholder"
        header={<span>Header</span>}
        options={[
          { key: 1, text: 'Choice 1', value: 1 },
          { key: 2, text: 'Choice 2', value: 2 },
          { key: 3, text: 'Choice 3', value: 3 }
        ]}
        onChange={(_, a) => console.log(a)}
      />
    </>
  )
}
