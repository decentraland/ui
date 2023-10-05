import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { SideMenu } from './SideMenu'

export default {
  title: 'SideMenu',
  component: SideMenu,
  argTypes: {
    onClick: { action: 'clicked' }
  }
} as ComponentMeta<typeof SideMenu>

const Template: ComponentStory<typeof SideMenu> = (args) => (
  <SideMenu {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
  value: 'wearables',
  items: [
    {
      id: 'wearables',
      label: 'Wearables',
      children: [
        {
          id: 'head',
          label: 'Head',
          children: [
            {
              id: 'facial-hair',
              label: 'Facial Hair'
            },
            {
              id: 'hair',
              label: 'Hair'
            },
            {
              id: 'eyes',
              label: 'Eyes'
            }
          ]
        },
        {
          id: 'upper-body',
          label: 'Upper Body'
        },
        {
          id: 'hand-wear',
          label: 'Hand Wear'
        }
      ]
    },
    {
      id: 'emotes',
      label: 'Emotes',
      children: [
        {
          id: 'dance',
          label: 'Dance'
        },
        {
          id: 'poses',
          label: 'Poses'
        },
        {
          id: 'fun',
          label: 'Fun'
        }
      ]
    }
  ]
}
