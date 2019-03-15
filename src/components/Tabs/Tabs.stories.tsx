import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { Tabs } from '../..'

import './Tabs.stories.css'

storiesOf('Tabs', module)
  .add('One active', () => (
    <div className="Tabs-story-container">
      <Tabs>
        <Tabs.Tab active>Atlas</Tabs.Tab>
        <Tabs.Tab>Market</Tabs.Tab>
        <Tabs.Tab>My Assets</Tabs.Tab>
      </Tabs>
    </div>
  ))
  .add('No divider', () => (
    <div className="Tabs-story-container">
      <Tabs hasDivider={false}>
        <Tabs.Tab active>Atlas</Tabs.Tab>
        <Tabs.Tab>Market</Tabs.Tab>
        <Tabs.Tab>My Assets</Tabs.Tab>
      </Tabs>
    </div>
  ))
