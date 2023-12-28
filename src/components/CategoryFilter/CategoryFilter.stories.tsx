import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { CategoryFilter } from './CategoryFilter'
import './CategoryFilter.stories.css'

export default {
  title: 'CategoryFilter',
  component: CategoryFilter,
  argTypes: {
    onClick: { action: 'clicked' }
  }
} as ComponentMeta<typeof CategoryFilter>

const Template: ComponentStory<typeof CategoryFilter> = (args) => (
  <CategoryFilter {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
  i18n: {
    title: 'Categories'
  },
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
