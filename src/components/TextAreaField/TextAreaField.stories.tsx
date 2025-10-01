import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Form } from 'semantic-ui-react'
import { TextAreaField } from './TextAreaField'

const textAreaValue = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`

const meta: Meta<typeof TextAreaField> = {
  title: 'TextAreaField',
  component: TextAreaField,
  parameters: {
    layout: 'centered'
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Placeholder: Story = {
  render: () => (
    <TextAreaField placeholder={textAreaValue} rows="10" cols="50" />
  )
}

export const WithoutLabel: Story = {
  render: () => (
    <TextAreaField value={textAreaValue} rows="10" cols="50" />
  )
}

export const WithoutLabelInForm: Story = {
  render: () => (
    <Form>
      <TextAreaField value={textAreaValue} rows="10" cols="50" />
    </Form>
  )
}

export const WithLabel: Story = {
  render: () => (
    <TextAreaField
      value={textAreaValue}
      label="Description"
      rows="10"
      cols="50"
    />
  )
}

export const WithTooltip: Story = {
  render: () => (
    <TextAreaField
      value={textAreaValue}
      label="Description"
      rows="10"
      cols="50"
      maxLength={300}
      tooltip={{
        content: 'This is a tooltip',
        position: 'top center'
      }}
    />
  )
}

export const WithoutLabelAndMaxLength: Story = {
  render: () => (
    <TextAreaField maxLength={300} value={textAreaValue} rows="10" cols="50" />
  )
}

export const WithLabelAndMaxLength: Story = {
  render: () => (
    <TextAreaField
      maxLength={300}
      label="Description"
      value={textAreaValue}
      rows="10"
      cols="50"
    />
  )
}

export const WithLabelInForm: Story = {
  render: () => (
    <Form>
      <TextAreaField
        value={textAreaValue}
        label="Description"
        rows="10"
        cols="50"
      />
    </Form>
  )
}

export const WithErrorWarningOrInfo: Story = {
  render: () => (
    <>
      <TextAreaField
        value={textAreaValue}
        maxLength={300}
        label="Description"
        rows="10"
        cols="50"
        error="An error occurred"
      />
      <br />
      <TextAreaField
        value={textAreaValue}
        maxLength={300}
        label="Description"
        rows="10"
        cols="50"
        warning="There's a warning!"
      />
      <br />
      <TextAreaField
        value={textAreaValue}
        maxLength={300}
        label="Description"
        rows="10"
        cols="50"
        info="This is some information"
      />
    </>
  )
}
