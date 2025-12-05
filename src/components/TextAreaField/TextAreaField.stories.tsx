import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { TextAreaField } from './TextAreaField'
import Form from 'semantic-ui-react/dist/commonjs/collections/Form/Form'

const textAreaValue =
  'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ' +
  "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s" +
  ', when an unknown printer took a galley of type and scrambled'

const meta: Meta<typeof TextAreaField> = {
  title: 'TextArea',
  component: TextAreaField,
}

export default meta
type Story = StoryObj<typeof TextAreaField>
export const Placeholder: Story = {
  render: () => (
    <TextAreaField placeholder={textAreaValue} rows="10" cols="50" />
  ),
}

export const WithoutLabel: Story = {
  render: () => (
    <TextAreaField value={textAreaValue} rows="10" cols="50" />
  ),
}

export const WithoutLabelInForm: Story = {
  render: () => (
    <Form>
      <TextAreaField value={textAreaValue} rows="10" cols="50" />
    </Form>
  ),
}

export const WithLabel: Story = {
  render: () => (
    <TextAreaField
      value={textAreaValue}
      label="Description"
      rows="10"
      cols="50"
    />
  ),
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
  ),
}

export const WithoutLabelAndMaxLength: Story = {
  render: () => (
    <TextAreaField maxLength={300} value={textAreaValue} rows="10" cols="50" />
  ),
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
  ),
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
  ),
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
      <br />
    </>
  ),
}
