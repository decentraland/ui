import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { RadioOptions } from './RadioOptions'
import './RadioOptions.stories.css'

storiesOf('RadioOptions', module).add('Select options', () => {
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
})
