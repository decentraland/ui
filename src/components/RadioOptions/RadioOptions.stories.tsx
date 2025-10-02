import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { RadioOptions } from './RadioOptions'
import './RadioOptions.stories.css'

const meta: Meta<typeof RadioOptions> = {
  title: 'RadioOptions',
  component: RadioOptions,
  parameters: {
    layout: 'centered'
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const SelectOptions: Story = {
  render: () => {
    const options = [
      {
        name: 'First option',
        info: 'This is the first option',
        value: 'first'
      },
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
        <RadioOptions
          value={value}
          options={options}
          onChange={onValueChange}
        />
      </div>
    )
  }
}
