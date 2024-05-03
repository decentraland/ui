import React from 'react'
import { storiesOf } from '@storybook/react'
import { IconBadge } from './IconBadge'

storiesOf('IconBadge', module)
  .add('With Icon', () => (
    <IconBadge
      icon="utility"
      text="Utility"
      onClick={() => console.log('Clicked!')}
    />
  ))
  .add('With Custom Icon', () => (
    <IconBadge text="Custom Icon">
      <div>Custom Icon Component</div>
    </IconBadge>
  ))
  .add('Without text', () => (
    <IconBadge icon="BaseFemale" onClick={() => console.log('Clicked!')} />
  ))
  .add('Without Icon', () => (
    <IconBadge text="No Icon" onClick={() => console.log('Clicked!')} />
  ))
