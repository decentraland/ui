import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { SliderField } from './SliderField'

storiesOf('SliderField', module)
  .add('Slider Simple', () => <SliderField header="SliderField Simple" />)
  .add('Range Simple', () => (
    <SliderField header="SliderField Simple Range" range={true} />
  ))
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
  .add('Range with Max and Min set', () => (
    <SliderField
      header="Min set at 200 and Max at 500"
      min={200}
      max={500}
      range={true}
    />
  ))
  .add('Default value', () => (
    <SliderField
      header="Default value set to 70"
      min={0}
      max={100}
      defaultValue={70}
    />
  ))
  .add('Range default value', () => (
    <SliderField
      header="Default value set to 20 - 70"
      min={0}
      max={100}
      defaultValue={[20, 70]}
      range={true}
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
  .add('Range with onMouseUp', () => (
    <SliderField
      header="SliderField Header"
      min={0}
      max={100}
      onMouseUp={(_, data) => alert(JSON.stringify(data))}
      range
    />
  ))
  .add('With onChange', () => (
    <SliderField
      header="Shown on console"
      min={0}
      max={100}
      onChange={(_, data) => console.log(data)}
    />
  ))
  .add('Range with onChange', () => (
    <SliderField
      header="Shown on console"
      min={0}
      max={100}
      onChange={(_, data) => console.log(data)}
      range
    />
  ))
  .add('with state', () => {
    const [value, setRange] = React.useState<number>(10)
    return (
      <SliderField
        header="Shown on console"
        min={0}
        max={10}
        valueFrom={0}
        valueTo={value}
        onChange={(_, data) => setRange(data[1])}
      />
    )
  })
  .add('range with state', () => {
    const [range, setRange] = React.useState<readonly [number, number]>([5, 10])
    return (
      <SliderField
        header="Shown on console"
        min={0}
        max={10}
        valueFrom={range[0]}
        valueTo={range[1]}
        onChange={(_, data) => setRange(data)}
        range
      />
    )
  })
