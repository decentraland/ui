import type { Meta, StoryObj } from '@storybook/react'
import Form from 'semantic-ui-react/dist/commonjs/collections/Form'
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon'
import { InputOnChangeData } from 'semantic-ui-react/dist/commonjs/elements/Input/Input'
import { Field } from './Field'

const address = '0x68FFc53C43C65C8Dd778969320e21B85b10363cE'

const meta: Meta<typeof Field> = {
  title: 'Field',
  component: Field,
}

export default meta
type Story = StoryObj<typeof Field>
export const Placeholder: Story = {
  render: () => <Field label="Label" placeholder="Placeholder" />,
}

export const Value: Story = {
  render: () => <Field label="Label" value="Input Value" />,
}

export const Message: Story = {
  render: () => (
    <Field label="Label" value="Input Value" message="Additional comment" />
  ),
}

export const Error: Story = {
  render: () => (
    <Field label="Label" value="Input Value" message="Some warning" error />
  ),
}

export const Loading: Story = {
  render: () => <Field label="Label" value="Input Value" loading />,
}

export const Address: Story = {
  render: () => <Field label="Label" value={address} type="address" />,
}

export const Numeric: Story = {
  render: () => (
    <Field label="Label" placeholder="1,000" type="number" />
  ),
}

export const Disabled: Story = {
  render: () => (
    <Field label="Label" value="This is disabled" disabled />
  ),
}

export const Date: Story = {
  render: () => (
    <Form>
      <Field
        label="Date input"
        type="date"
        onChange={(
          _event: React.ChangeEvent<HTMLInputElement>,
          props: InputOnChangeData
        ) => {
          console.log(props.value)
        }}
      />
      <Field
        label="Date input with value pre selected"
        type="date"
        onChange={(
          _event: React.ChangeEvent<HTMLInputElement>,
          props: InputOnChangeData
        ) => {
          console.log(props.value)
        }}
        value={'1996-12-19'}
      />
    </Form>
  ),
}

export const Action: Story = {
  render: () => (
    <Field
      label="Label"
      value="Input value"
      action="submit"
      onAction={() => alert('Action triggered!')}
    />
  ),
}

export const WithIcon: Story = {
  render: () => (
    <Field
      label="Label"
      value="Input value"
      action="submit"
      icon={<Icon name="search" />}
      iconPosition="left"
      onAction={() => alert('Action triggered!')}
    />
  ),
}

export const InsideAForm: Story = {
  render: () => (
    <Form>
      <Field label="Label" placeholder="Placeholder" />
      <Field label="Label" value="Input Value" />
      <Field label="Label" value="Input Value" message="Additional comment" />
      <Field
        type="address"
        label="Label"
        value="Input Value"
        message="Some warning"
        error
      />
      <Field label="Label" value="Input Value" loading />
      <Field label="Label" value={address} type="address" />
      <Field label="Label" placeholder="1,000" type="number" />
      <Field label="Label" value="This is disabled" disabled />
      <Field
        label="Label"
        value="Input value"
        action="submit"
        onAction={() => alert('Action triggered!')}
      />
    </Form>
  ),
}

export const WithBorders: Story = {
  render: () => (
    <Form>
      <Field label="Label" placeholder="Placeholder" kind="full" />
      <Field label="Label" value="Input Value" kind="full" />
      <Field
        label="Label"
        value="Input Value"
        message="Additional comment"
        kind="full"
      />
      <Field
        type="address"
        label="Label"
        value="Input Value"
        message="Some warning"
        kind="full"
        error
      />
      <Field label="Label" value="Input Value" loadin kind="full" />
      <Field label="Label" value={address} type="address" kind="full" />
      <Field label="Label" placeholder="1,000" type="number" kind="full" />
      <Field label="Label" value="This is disabled" disabled kind="full" />
      <Field
        label="Label"
        value="Input value"
        action="submit"
        onAction={() => alert('Action triggered!')}
        kind="full"
      />
    </Form>
  ),
}

export const WithMaxLengthAndLabel: Story = {
  render: () => (
    <>
      <Field maxLength={20} value="A value" />
      <Field label="A label" maxLength={20} value="A value" />
    </>
  ),
}

export const WithAReactElementAsAMessage: Story = {
  render: () => (
    <Field label="A label" value="A value" message={<label>A message</label>} />
  ),
}

export const WithWarningInfoAndErrorMessages: Story = {
  render: () => (
    <>
      <Field
        label="A label"
        maxLength={20}
        value="An error value"
        error
        message={'This is an error!'}
      />
      <br />
      <Field
        label="A label"
        maxLength={20}
        value="A value"
        warning={'The value is duplicated'}
      />
      <br />
      <Field
        label="A label"
        maxLength={20}
        value="A value"
        info={'This input can have at maximum 20 characters'}
      />
    </>
  ),
}
