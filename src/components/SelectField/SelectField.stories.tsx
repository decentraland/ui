import * as React from 'react'
import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { SelectField } from '../../index'

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
