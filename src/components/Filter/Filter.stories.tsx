import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { Filter } from './Filter'

storiesOf('Filter', module).add('One active', () => (
  <>
    <Filter active>2 Parcels</Filter>
    <Filter>1 Estate</Filter>
    <Filter>1 Contributions</Filter>
    <Filter>1 Mortgage</Filter>
  </>
))
