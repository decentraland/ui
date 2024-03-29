import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { Radio } from './Radio'
import { Row } from '../Row/Row'

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
    <Row stacked>
      <Radio checked={true} label="Yes" />
      <Radio checked={false} label="No" />
      <Radio label="Abstain" />
    </Row>
  ))
  .add('Toggle', () => (
    <>
      <Radio toggle label="ON SALE" />
    </>
  ))
