import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { SliderField } from './SliderField'

const meta: Meta<typeof SliderField> = {
  title: 'SliderField',
  component: SliderField,
  parameters: {
    layout: 'centered'
  }
}

export default meta
type Story = StoryObj<typeof SliderField>

export const SimpleRange: Story = {
  args: { header: 'SliderField Simple Range', range: true },
  render: () => <SliderField header="SliderField Simple Range" range={true} />
}

export const WithLabel: Story = {
  args: {
    header: 'SliderField Label',
    label: 'This is a label',
    min: 0,
    max: 100
  },
  render: () => (
    <SliderField
      header="SliderField Label"
      label="This is a label"
      min={0}
      max={100}
    />
  )
}

export const WithMaxAndMinSet: Story = {
  args: { header: 'Min set at 200 and Max at 500', min: 200, max: 500 },
  render: () => (
    <SliderField header="Min set at 200 and Max at 500" min={200} max={500} />
  )
}

export const RangeWithMaxAndMinSet: Story = {
  args: {
    header: 'Min set at 200 and Max at 500',
    min: 200,
    max: 500,
    range: true
  },
  render: () => (
    <SliderField
      header="Min set at 200 and Max at 500"
      min={200}
      max={500}
      range={true}
    />
  )
}

export const DefaultValue: Story = {
  args: {
    header: 'Default value set to 70',
    min: 0,
    max: 100,
    defaultValue: 70
  },
  render: () => (
    <SliderField
      header="Default value set to 70"
      min={0}
      max={100}
      defaultValue={70}
    />
  )
}

export const RangeDefaultValue: Story = {
  args: {
    header: 'Default value set to 20 - 70',
    min: 0,
    max: 100,
    defaultValue: [20, 70],
    range: true
  },
  render: () => (
    <SliderField
      header="Default value set to 20 - 70"
      min={0}
      max={100}
      defaultValue={[20, 70]}
      range={true}
    />
  )
}

export const WithOnMouseUp: Story = {
  args: { header: 'SliderField Header', min: 0, max: 100 },
  render: () => (
    <SliderField
      header="SliderField Header"
      min={0}
      max={100}
      onMouseUp={(_, data) => alert(JSON.stringify(data))}
    />
  )
}

export const RangeWithOnMouseUp: Story = {
  args: { header: 'SliderField Header', min: 0, max: 100, range: true },
  render: () => (
    <SliderField
      header="SliderField Header"
      min={0}
      max={100}
      onMouseUp={(_, data) => alert(JSON.stringify(data))}
      range
    />
  )
}

export const WithOnChange: Story = {
  args: { header: 'Shown on console', min: 0, max: 100 },
  render: () => (
    <SliderField
      header="Shown on console"
      min={0}
      max={100}
      onChange={(_, data) => console.log(data)}
    />
  )
}

export const RangeWithOnChange: Story = {
  args: { header: 'Shown on console', min: 0, max: 100, range: true },
  render: () => (
    <SliderField
      header="Shown on console"
      min={0}
      max={100}
      onChange={(_, data) => console.log(data)}
      range
    />
  )
}

export const WithState: Story = {
  args: { header: 'Shown on console', min: 0, max: 10 },
  render: () => {
    const [value, setRange] = React.useState<number>(10)
    return (
      <SliderField
        header="Shown on console"
        min={0}
        max={10}
        valueTo={value}
        onChange={(_, data) => setRange(data as number)}
      />
    )
  }
}
