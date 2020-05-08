import * as React from 'react'
import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { Empty } from './Empty'
import { Page } from '../..'

storiesOf('Empty', module)
  .addDecorator(centered)
  .add('No results', () => (
    <Page>
      <Empty>No results...</Empty>
    </Page>
  ))
  .add('With link', () => (
    <Page>
      <Empty>
        <span>
          Your Scenes were uploaded to the Cloud. <a>Sign In</a> to load them
          back.
        </span>
      </Empty>
    </Page>
  ))
  .add('Fixed height', () => (
    <Page>
      <Empty height={100}>This has a fixed height.</Empty>
    </Page>
  ))
