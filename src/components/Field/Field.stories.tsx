import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { Field } from '../..'

const address = '0x68FFc53C43C65C8Dd778969320e21B85b10363cE'

storiesOf('Field', module)
  .add('Placeholder', () => <Field label="Label" placeholder="Placeholder" />)
  .add('Value', () => <Field label="Label" value="Input Value" />)
  .add('Message', () => <Field label="Label" value="Input Value" message="Additional comment" />)
  .add('Error', () => <Field label="Label" value="Input Value" message="Some warning" error />)
  .add('Loading', () => <Field label="Label" value="Input Value" loading />)
  .add('Address', () => <Field label="Label" value={address} type="address" />)
  .add('Numeric', () => <Field label="Label" placeholder="1,000" type="number" />)
  .add('Disabled', () => <Field label="Label" value="This is disabled" disabled />)
  .add('Action', () => <Field label="Label" value="Input value" action="submit" onAction={() => alert('Action triggered!')} />)
