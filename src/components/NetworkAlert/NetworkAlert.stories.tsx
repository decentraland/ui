import * as React from 'react'
import { storiesOf } from '@storybook/react'

import { Navbar } from '../Navbar/Navbar'
import { NetworkAlert } from './NetworkAlert'
import '../Navbar/Navbar.stories.css'

storiesOf('NetworkAlert', module).add('Partially supported network', () => {
  return (
    <div className="Navbar-story-container">
      <NetworkAlert onSwitchNetwork={() => undefined} />
      <Navbar activePage="dao" />
    </div>
  )
})
