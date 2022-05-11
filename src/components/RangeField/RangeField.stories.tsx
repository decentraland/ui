import * as React from 'react'
import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { RangeField } from './RangeField'


storiesOf('RangeField', module)
  .addDecorator(centered)
  .add('Simple', () => (
    <RangeField
      header="RangeField Simple"
    />
  ))
  .add('With Label', () => (
    <RangeField
      header="RangeField Label"
      label="This is a label"
      min={0}
      max={100}
    />
  ))
  .add('With Max and Min set', () => (
    <RangeField
      header="Min set at 200 and Max at 500"
      min={200}
      max={500}
    />
  ))
  .add('Default Value', () => (
    <RangeField
      header="Default value set to 20 - 70"
      min={0}
      max={100}
      defaultValue={[20, 70]}
    />
  ))
  .add('With onMouseUp', () => (
    <RangeField
      header="RangeField Header"
      min={0}
      max={100}
      onMouseUp={(_, data) => alert(JSON.stringify(data))}
    />
  ))
  .add('With onChange', () => (
    <RangeField
      header="RangeField Header"
      min={0}
      max={100}
      onChange={(_, data) => console.log(data)}
    />
  ))
