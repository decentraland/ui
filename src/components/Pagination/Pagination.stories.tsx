import * as React from 'react'
import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { Pagination } from './Pagination'

storiesOf('Pagination', module)
  .addDecorator(centered)
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
