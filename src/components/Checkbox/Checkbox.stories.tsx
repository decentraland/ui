import * as React from 'react'
import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { Checkbox } from './Checkbox'

storiesOf('Checkbox', module)
  .addDecorator(centered)
  .add('Checked', () => <Checkbox checked={true} label="Yes" />)
  .add('Unchecked', () => <Checkbox checked={false} label="Yes" />)
  .add('Toggle', () => <Checkbox toggle label="ON SALE" />)
