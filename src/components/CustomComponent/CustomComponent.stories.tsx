import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { CustomComponent } from '../..'

storiesOf('CustomComponent', module).add('Pepe', () => (
  <CustomComponent name="Pepe" />
))
