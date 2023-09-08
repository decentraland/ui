import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { CategoryFilter } from './CategoryFilter'

storiesOf('CategoryFilter', module).add('Basic Filter', () => {
  return (
    <CategoryFilter
      title="categories"
      value="wearables"
      items={[
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
                }
              ]
            }
          ]
        }
      ]}
    />
  )
})
