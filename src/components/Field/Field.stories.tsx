import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Icon } from 'semantic-ui-react'
import { Form } from 'semantic-ui-react'
import { Field } from './Field'

const meta: Meta<typeof Field> = {
  title: 'Field',
  component: Field,
  parameters: {
    layout: 'centered'
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <>
      <Field label="Label" placeholder="Placeholder" />
    </>
  )
}

export const WithIcon: Story = {
  render: () => (
    <>
      <Field label="Label" placeholder="Placeholder" icon={<Icon name="search" />} />
    </>
  )
}

export const InsideAForm: Story = {
  render: () => (
    <Form>
      <Field label="Label" placeholder="Placeholder" />
    </Form>
  )
}

export const Error: Story = {
  render: () => (
    <>
      <Field label="Label" placeholder="Placeholder" error="This is an error" />
    </>
  )
}

export const Warning: Story = {
  render: () => (
    <>
      <Field label="Label" placeholder="Placeholder" warning="This is a warning" />
    </>
  )
}

export const Info: Story = {
  render: () => (
    <>
      <Field label="Label" placeholder="Placeholder" info="This is info" />
    </>
  )
}

export const Loading: Story = {
  render: () => (
    <>
      <Field label="Label" placeholder="Placeholder" loading />
    </>
  )
}

export const Disabled: Story = {
  render: () => (
    <>
      <Field label="Label" placeholder="Placeholder" disabled />
    </>
  )
}

export const Required: Story = {
  render: () => (
    <>
      <Field label="Label" placeholder="Placeholder" required />
    </>
  )
}
