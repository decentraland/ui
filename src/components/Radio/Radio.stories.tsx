import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { Radio } from '../..'

storiesOf('Radio', module).add('Poll', () => (
  <>
    <Radio checked={true} label="Yes" />
    <Radio checked={false} label="No" />
    <Radio label="Abstain" />
  </>
))
