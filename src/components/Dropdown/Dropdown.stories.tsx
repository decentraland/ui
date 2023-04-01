import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { Dropdown } from './Dropdown'

storiesOf('Dropdown', module).add('Filters', () => (
  <Dropdown text="All polls" direction="right">
    <Dropdown.Menu>
      <Dropdown.Item text="All polls" />
      <Dropdown.Item text="Ongoing polls" />
      <Dropdown.Item text="Closed polls" />
    </Dropdown.Menu>
  </Dropdown>
))
