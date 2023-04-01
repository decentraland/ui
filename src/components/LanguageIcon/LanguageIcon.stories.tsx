import * as React from 'react'
import { storiesOf } from '@storybook/react'

import { LanguageIcon } from './LanguageIcon'
import './LanguageIcon.stories.css'

storiesOf('LanguageIcon', module)
  .add('Single', () => <LanguageIcon locale="en" />)
  .add('Options', () => (
    <div className="LanguageIcon-story">
      <LanguageIcon locale="en" label="English" />
      <LanguageIcon locale="es" label="Spanish" />
      <LanguageIcon locale="fr" label="French" />
      <LanguageIcon locale="ja" label="Japanese" />
      <LanguageIcon locale="zh" label="Chinese" />
      <LanguageIcon locale="ko" label="Korean" />
    </div>
  ))
