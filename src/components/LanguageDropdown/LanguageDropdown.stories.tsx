import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { LanguageDropdown } from '../..'

storiesOf('LanguageDropdown', module)
  .add('Uncontrolled left downward', () => <LanguageDropdown />)
  .add('Controlled right upward', () => (
    <LanguageDropdown
      locale="zh"
      direction="right"
      upward
      locales={['zh', 'ko', 'ja']}
    />
  ))
