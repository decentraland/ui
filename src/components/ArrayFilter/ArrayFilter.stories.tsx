import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { ArrayFilter } from './ArrayFilter'

const meta: Meta<typeof ArrayFilter> = {
  title: 'ArrayFilter',
  component: ArrayFilter,
}

export default meta
type Story = StoryObj<typeof ArrayFilter>

export const MultipleSelectableValues: Story = {
  render: () => {
    const [values, setValues] = useState([])

    return (
      <ArrayFilter
        name="Networks"
        values={values}
        options={[
          { text: 'Mainnet', value: 'mainnet' },
          { text: 'Rinkeby', value: 'rinkeby' },
          { text: 'Mumbai', value: 'mumbai' }
        ]}
        onChange={setValues}
      />
    )
  },
}
