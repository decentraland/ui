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
      value={1}
      items={[
        {
          title: 'Item 1',
          description: 'Description of the item 1',
          value: 1
        },
        {
          title: 'Item 2',
          description: 'Description of the Active item 2',
          value: 2
        },
        {
          title: 'Item 3',
          description: 'Description of the item 3',
          value: 3
        }
      ]}
    />
  ))
  .add('With disable items', () => (
    <ToggleBox
      header="Header text with disabled items"
      value={3}
      items={[
        {
          title: 'Item 1',
          description: 'Description of the active item 1',
          value: 1,
          disabled: false
        },
        {
          title: 'Item 2',
          description: 'Description of the disabled item 2',
          value: 2,
          disabled: true
        },
        {
          title: 'Item 3',
          description: 'Description of the item 3',
          value: 3,
          disabled: false
        }
      ]}
    />
  ))
  .add('Without border (borderless)', () => (
    <ToggleBox
      header="Without border"
      borderless
      value={3}
      items={[
        {
          title: 'Item 1',
          description: 'Description of the active item 1',
          value: 1,
          disabled: false
        },
        {
          title: 'Item 2',
          description: 'Description of the disabled item 2',
          value: 2,
          disabled: true
        },
        {
          title: 'Item 3',
          description: 'Description of the item 3',
          value: 3,
          disabled: false
        }
      ]}
    />
  ))
