import * as React from 'react'
import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'
import { LanguageDropdown } from './LanguageDropdown'

storiesOf('LanguageDropdown', module)
  .addDecorator(centered)
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
