import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { Pagination } from '../..'

storiesOf('Pagination', module).add('Five pages one selected', () => (
  <Pagination activePage={2} totalPages={5} firstItem={null} lastItem={null} />
))
