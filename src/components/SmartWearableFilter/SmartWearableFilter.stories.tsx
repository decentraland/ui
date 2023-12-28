import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { SmartWearableFilter } from './SmartWearableFilter'

storiesOf('SmartWearableFilter', module).add('Select SW', () => {
  const i18n = {
    title: 'Smart',
    selected: 'Only Smart'
  }

  const [isOnlySmart, setIsOnlySmart] = useState(false)

  return (
    <SmartWearableFilter
      i18n={i18n}
      isOnlySmart={isOnlySmart}
      onChange={(value) => setIsOnlySmart(value)}
    />
  )
})
