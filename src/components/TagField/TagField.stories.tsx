import * as React from 'react'
import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { TagField } from './TagField'

storiesOf('TagField', module)
  .addDecorator(centered)
  .add('Basic', () => (
    <>
      <TagField
        label="Tags (optional)"
        placeholder="e.g. (outdoors furniture floor)"
      />
    </>
  ))
  .add('On Change', () => (
    <>
      <TagField
        label="Tags (optional)"
        placeholder="e.g. (outdoors furniture floor)"
        onChange={(_, props) => alert(JSON.stringify(props.value))}
      />
    </>
  ))

  .add('Error', () => (
    <>
      <TagField
        label="Tags (optional)"
        placeholder="e.g. (outdoors furniture floor)"
        message="Something went wrong"
        error
      />
    </>
  ))

  .add('Default values', () => (
    <>
      <TagField
        label="Tags (optional)"
        placeholder="e.g. (outdoors furniture floor)"
        value={['genesis', 'city', 'town']}
      />
    </>
  ))
