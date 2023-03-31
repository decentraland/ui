import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { Pagination } from './Pagination'

storiesOf('Pagination', module)
  .add('5 pages', () => (
    <Pagination
      defaultActivePage={2}
      totalPages={5}
      firstItem={null}
      lastItem={null}
    />
  ))
  .add('1000 pages', () => (
    <Pagination
      defaultActivePage={77}
      totalPages={1000}
      firstItem={null}
      lastItem={null}
    />
  ))
