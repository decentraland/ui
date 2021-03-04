import * as React from 'react'
import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import Form from 'semantic-ui-react/dist/commonjs/collections/Form'
import { Field } from './Field'

const address = '0x68FFc53C43C65C8Dd778969320e21B85b10363cE'

storiesOf('Field', module)
  .addDecorator(centered)
  .add('Placeholder', () => <Field label="Label" placeholder="Placeholder" />)
  .add('Value', () => <Field label="Label" value="Input Value" />)
  .add('Message', () => (
    <Field label="Label" value="Input Value" message="Additional comment" />
  ))
  .add('Error', () => (
    <Field label="Label" value="Input Value" message="Some warning" error />
  ))
  .add('Loading', () => <Field label="Label" value="Input Value" loading />)
  .add('Address', () => <Field label="Label" value={address} type="address" />)
  .add('Numeric', () => (
    <Field label="Label" placeholder="1,000" type="number" />
  ))
  .add('Disabled', () => (
    <Field label="Label" value="This is disabled" disabled />
  ))
  .add('Action', () => (
    <Field
      label="Label"
      value="Input value"
      action="submit"
      onAction={() => alert('Action triggered!')}
    />
  ))
  .add('Inside a Form', () => (
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
  ))
