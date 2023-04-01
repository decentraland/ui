import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { Checkbox } from './Checkbox'

storiesOf('Checkbox', module)
  .add('Checked', () => <Checkbox checked={true} label="Yes" />)
  .add('Unchecked', () => <Checkbox checked={false} label="Yes" />)
  .add('Toggle', () => <Checkbox toggle label="ON SALE" />)
