import React from 'react'
import { ThemePicker } from './theme'
import 'semantic-ui-css/semantic.min.css'
import 'balloon-css/balloon.min.css'
import '../src/themes/base-theme.css'
import '../src/themes/alternative/light-theme.css'
import '../src/themes/alternative/dark-theme.css'

// Add custom CSS for Semantic UI icons
const iconStyles = `
  @font-face {
    font-family: 'Icons';
    src: url('https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/themes/default/assets/fonts/icons.eot');
    src: url('https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/themes/default/assets/fonts/icons.eot?#iefix') format('embedded-opentype'),
         url('https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/themes/default/assets/fonts/icons.woff2') format('woff2'),
         url('https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/themes/default/assets/fonts/icons.woff') format('woff'),
         url('https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/themes/default/assets/fonts/icons.ttf') format('truetype'),
         url('https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/themes/default/assets/fonts/icons.svg#icons') format('svg');
    font-weight: normal;
    font-style: normal;
  }
`

// Inject the styles
if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = iconStyles
  document.head.appendChild(style)
}

// Mock environment variables for Storybook
if (typeof window !== 'undefined') {
  ;(window as any).ENV = {
    TRANSAK: 'transak',
    MOON_PAY: 'moonPay',
    NETWORK: 'ethereum'
    // Add other environment variables as needed
  }
}

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
