import * as React from 'react'
import { storiesOf } from '@storybook/react'

import { Tabs } from './Tabs'
import './Tabs.stories.css'

storiesOf('Tabs', module)
  .add('Basic', () => (
    <div className="Tabs-story-container">
      <Tabs>
        <Tabs.Tab active>Atlas</Tabs.Tab>
        <Tabs.Tab>Market</Tabs.Tab>
        <Tabs.Tab>My Assets</Tabs.Tab>
      </Tabs>
    </div>
  ))
  .add('Fullscreen', () => (
    <div className="Tabs-story-container">
      <Tabs isFullscreen>
        <Tabs.Tab active>Atlas</Tabs.Tab>
        <Tabs.Tab>Market</Tabs.Tab>
        <Tabs.Tab>My Assets</Tabs.Tab>
      </Tabs>
    </div>
  ))
