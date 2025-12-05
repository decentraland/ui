import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { SliderField } from './SliderField'

const meta: Meta<typeof SliderField> = {
  title: 'SliderField',
  component: SliderField,
}

export default meta
type Story = StoryObj<typeof SliderField>
export const SliderSimple: Story = {
  render: () => <SliderField header="SliderField Simple" />,
}

export const RangeSimple: Story = {
  render: () => (
    <SliderField header="SliderField Simple Range" range={true} />
  ),
}

export const WithLabel: Story = {
  render: () => (
    <SliderField
      header="SliderField Label"
      label="This is a label"
      min={0}
      max={100}
    />
  ),
}

export const WithMaxAndMinSet: Story = {
  render: () => (
    <SliderField header="Min set at 200 and Max at 500" min={200} max={500} />
  ),
}

export const RangeWithMaxAndMinSet: Story = {
  render: () => (
    <SliderField
      header="Min set at 200 and Max at 500"
      min={200}
      max={500}
      range={true}
    />
  ),
}

export const DefaultValue: Story = {
  render: () => (
    <SliderField
      header="Default value set to 70"
      min={0}
      max={100}
      defaultValue={70}
    />
  ),
}

export const RangeDefaultValue: Story = {
  render: () => (
    <SliderField
      header="Default value set to 20 - 70"
      min={0}
      max={100}
      defaultValue={[20, 70]}
      range={true}
    />
  ),
}

export const WithOnMouseUp: Story = {
  render: () => (
    <SliderField
      header="SliderField Header"
      min={0}
      max={100}
      onMouseUp={(_, data) => alert(JSON.stringify(data))}
    />
  ),
}

export const RangeWithOnMouseUp: Story = {
  render: () => (
    <SliderField
      header="SliderField Header"
      min={0}
      max={100}
      onMouseUp={(_, data) => alert(JSON.stringify(data))}
      range
    />
  ),
}

export const WithOnChange: Story = {
  render: () => (
    <SliderField
      header="Shown on console"
      min={0}
      max={100}
      onChange={(_, data) => console.log(data)}
    />
  ),
}

export const RangeWithOnChange: Story = {
  render: () => (
    <SliderField
      header="Shown on console"
      min={0}
      max={100}
      onChange={(_, data) => console.log(data)}
      range
    />
  ),
}

export const WithState: Story = {
  render: () => {
    const [value, setRange] = useState<number>(10)
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
  },
}

export const RangeWithState: Story = {
  render: () => {
    const [range, setRange] = useState<readonly [number, number]>([5, 10])
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
  },
}
