import * as React from 'react'
import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { ToggleBox } from './ToggleBox'

storiesOf('ToggleBox', module)
  .addDecorator(centered)
  .add('Simple', () => (
    <ToggleBox
      header="Header text"
      items={[
        { title: 'Item 1', description: 'Description of the item 1' },
        { title: 'Item 2', description: 'Description of the item 2' },
        { title: 'Item 3', description: 'Description of the item 3' }
      ]}
    />
  ))
  .add('With active item', () => (
    <ToggleBox
      header="Header text"
      items={[
        {
          title: 'Item 1',
          description: 'Description of the item 1',
          active: false
        },
        {
          title: 'Item 2',
          description: 'Description of the Active item 2',
          active: true
        },
        {
          title: 'Item 3',
          description: 'Description of the item 3',
          active: false
        }
      ]}
    />
  ))
  .add('With disable items', () => (
    <ToggleBox
      header="Header text with disabled items"
      items={[
        {
          title: 'Item 1',
          description: 'Description of the active item 1',
          active: true,
          disabled: false
        },
        {
          title: 'Item 2',
          description: 'Description of the disabled item 2',
          disabled: true
        },
        {
          title: 'Item 3',
          description: 'Description of the item 3',
          disabled: false
        }
      ]}
    />
  ))
