import * as React from 'react'
import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { Header } from '../Header/Header'
import { SelectField } from './SelectField'

storiesOf('SelectField', module)
  .addDecorator(centered)
  .add('Basic', () => (
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
  ))
  .add('Message', () => (
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
  ))
  .add('Error', () => (
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
  ))
  .add('Disabled options', () => (
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
  ))
  .add('Disabled field', () => (
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
  ))
  .add('Default option', () => (
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
  ))
  .add('With header', () => (
    <>
      <SelectField
        label="Label"
        placeholder="Placeholder"
        header={<Header size="small">Small header</Header>}
        options={[
          { key: 1, text: 'Choice 1', value: 1 },
          { key: 1, text: 'Choice 2', value: 2, disabled: true },
          { key: 3, text: 'Choice 3', value: 3 },
          { key: 4, text: 'Choice 4', value: 4, disabled: true },
          { key: 5, text: 'Choice 5', value: 5 },
          { key: 6, text: 'Choice 6', value: 5 },
          { key: 7, text: 'Choice 7', value: 5 },
          { key: 8, text: 'Choice 8', value: 5 },
          { key: 9, text: 'Choice 9', value: 5 },
          { key: 10, text: 'Choice 10', value: 5 }
        ]}
      />
    </>
  ))
