import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { ArrayFilter } from './ArrayFilter'

storiesOf('ArrayFilter', module).add('Multiple selectable values', () => {
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
})
