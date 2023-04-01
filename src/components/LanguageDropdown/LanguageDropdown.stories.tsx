import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { LanguageDropdown } from './LanguageDropdown'

storiesOf('LanguageDropdown', module)
  .add('Uncontrolled left downward', () => (
    <LanguageDropdown locales={['en', 'es', 'fr', 'zh', 'ko', 'ja']} />
  ))
  .add('Controlled right upward', () => (
    <LanguageDropdown
      locale="zh"
      direction="right"
      upward
      locales={['zh', 'ko', 'ja']}
    />
  ))
