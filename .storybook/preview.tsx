import React from 'react'
import { ThemePicker } from './theme'
import 'semantic-ui-css/semantic.min.css'
import 'balloon-css/balloon.min.css'
import '../src/themes/base-theme.css'
import '../src/themes/alternative/light-theme.css'
import '../src/themes/alternative/dark-theme.css'

export const decorators = [
  (Story) => (
    <>
      <ThemePicker />
      <Story />
    </>
  )
]

export const parameters = {
  layout: 'centered'
}
