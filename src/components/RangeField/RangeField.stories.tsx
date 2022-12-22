import * as React from 'react'
import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { RangeField } from './RangeField'

storiesOf('RangeField', module)
  .addDecorator(centered)
  .add('Simple', () => (
    <RangeField value={[]} onChange={(params) => console.log(params)} />
  ))
  .add('Custom labels', () => (
    <RangeField
      minLabel="MIN PRICE"
      maxLabel="MAX PRICE"
      onChange={(params) => console.log(params)}
      value={['2', '4']}
    />
  ))
  .add('With min max limits', () => (
    <RangeField
      rangeLimitMin={0}
      rangeLimitMax={6}
      onChange={(params) => console.log(params)}
      value={['2', '4']}
    />
  ))
