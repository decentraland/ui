import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { Radio } from '../..'

storiesOf('Radio', module)
  .add('Checked', () => (
    <>
      <Radio checked={true} label="Yes" />
    </>
  ))
  .add('Unchecked', () => (
    <>
      <Radio checked={false} label="No" />
    </>
  ))
  .add('Options', () => (
    <>
      <Radio checked={true} label="Yes" />
      <Radio checked={false} label="No" />
      <Radio label="Abstain" />
    </>
  ))
