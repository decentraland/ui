import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { RadioOptions } from './RadioOptions'
import './RadioOptions.stories.css'

const meta: Meta<typeof RadioOptions> = {
  title: 'RadioOptions',
  component: RadioOptions,
}

export default meta
type Story = StoryObj<typeof RadioOptions>

export const SelectOptions: Story = {
  render: () => {
    const options = [
      { name: 'First option', info: 'This is the first option', value: 'first' },
      {
        name: 'Second option',
        info: 'This is the second option',
        value: 'second'
      },
      { name: 'Third option', value: 'third' }
    ]
    const [value, onValueChange] = useState(undefined)

    return (
      <div className="radio-options-story">
        <RadioOptions value={value} options={options} onChange={onValueChange} />
      </div>
    )
  },
}
