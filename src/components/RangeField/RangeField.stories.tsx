import * as React from 'react'
import { storiesOf } from '@storybook/react'
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon'
import { RangeField } from './RangeField'

storiesOf('RangeField', module)
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
  .add('With custom props', () => (
    <RangeField
      rangeLimitMin={0}
      rangeLimitMax={6}
      onChange={(params) => console.log(params)}
      value={['2', '4']}
      minProps={{ icon: <Icon name="search" />, iconPosition: 'left' }}
    />
  ))
