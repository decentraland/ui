import * as React from 'react'
import { storiesOf } from '@storybook/react'
import centered from '@storybook/addon-centered/react'

import { LanguageIcon } from './LanguageIcon'
import './LanguageIcon.stories.css'

storiesOf('LanguageIcon', module)
  .addDecorator(centered)
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
