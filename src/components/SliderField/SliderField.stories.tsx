import * as React from 'react'
import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { SliderField } from './SliderField'

storiesOf('SliderField', module)
  .addDecorator(centered)
  .add('Simple', () => <SliderField header="SliderField Simple" />)
  .add('With Label', () => (
    <SliderField
      header="SliderField Label"
      label="This is a label"
      min={0}
      max={100}
    />
  ))
  .add('With Max and Min set', () => (
    <SliderField header="Min set at 200 and Max at 500" min={200} max={500} />
  ))
  .add('Default Value', () => (
    <SliderField
      header="Default value set to 70"
      min={0}
      max={100}
      defaultValue={70}
    />
  ))
  .add('With onMouseUp', () => (
    <SliderField
      header="SliderField Header"
      min={0}
      max={100}
      onMouseUp={(_, data) => alert(JSON.stringify(data))}
    />
  ))
  .add('With onChange', () => (
    <SliderField
      header="SliderField Header"
      min={0}
      max={100}
      onChange={(_, data) => console.log(data)}
    />
  ))
