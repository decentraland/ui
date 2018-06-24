import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { Mana } from '../..'

storiesOf('Tooltip', module).add('Hover to show', () => (
  <div style={{ maxWidth: 100 }}>
    <Mana size="large" data-balloon="MANA" data-balloon-pos="up" />
  </div>
))
