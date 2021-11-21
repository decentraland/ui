import * as React from 'react'
import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { TextFilter } from './TextFilter'

function generateValueAndChangeFunction() {
  const result = {
    fieldValue: undefined
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any

  result.onChange = (value) => {
    result.fieldValue = value
  }

  return result
}

const firstExample = generateValueAndChangeFunction()

storiesOf('TextFilter', module)
  .addDecorator(centered)
  .add('Basic filter', () => (
    <TextFilter
      placeholder="This is a placeholder"
      value={firstExample.value}
      onChange={firstExample.onChange}
    />
  ))
  .add('Basic filter with a name', () => (
    <TextFilter
      placeholder="This is a placeholder"
      label="This is a label"
      value={firstExample.value}
      onChange={firstExample.onChange}
    />
  ))
