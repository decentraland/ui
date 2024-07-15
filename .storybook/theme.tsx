import * as React from 'react'
import { Radio } from '../src/components/Radio/Radio'
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon'
import './theme.css'

const { useState, useCallback, useEffect } = React

const LIGHT_THEME = `
:root {
  /* global */
  --background: #ffffff;
  --danger: #ffa900;
  --error: #ff0000;

  /* buttons */
  --primary: #ff2d55;
  --secondary: #f3f2f5;
  --primary-hover: #ff3d61;
  --secondary-hover: #ecebed;

  /* on modals */
  --secondary-on-modal: #f3f2f5;
  --secondary-on-modal-hover: #ecebed;
  --card-on-modal: #ffffff;

  /* text */
  --text: #16141a;
  --secondary-text: #676370;
  --text-on-primary: #ffffff;
  --text-on-secondary: #16141a;

  /* ui */
  --divider: #67637033;
  --dropdown: #ffffff;
  --dropdown-hover: #f3f2f5;
  --popup: #16141a;
  --popup-text: #ffffff;
  --navbar-popup: #ffffff;
  --navbar-popup-hover: #f3f2f5;
  --card: #ffffff;
  --outline: 1px solid #00000005;
  --toast: #16141a;
  --toast-text: #ffffff;
  --modal: #ffffff;
  --dimmer: #ffffffdd;
  --text-area-border: #67637033;
  --clear-divider: #a09ba8;
  --navbar-icons: #000;

  /* shadows */
  --shadow-1: 0px 2px 4px 0px rgba(0, 0, 0, 0.08);
  --shadow-2: 0px 10px 20px 0px rgba(0, 0, 0, 0.12);
  --shadow-3: 0px 16px 32px 0px rgba(0, 0, 0, 0.16);
  --shadow-4: 0px 8px 16px 12px rgba(0, 0, 0, 0.1);

  --shadow-color-1: 0px 2px 4px 0px rgba(0, 0, 0, 0.16);
  --shadow-color-2: 0px 10px 20px 0px rgba(0, 0, 0, 0.2);
  --shadow-color-3: 0px 16px 32px 0px rgba(0, 0, 0, 0.24);

  /* svgs */
  --brightness: brightness(0.1);
  /* black svgs */
  --notification-onboarding-bell: url(../../assets/bell-onboarding-light.png);

  /* Navbar2 */
  --navbar-menu-enabled: #a09ba8;
  --navbar-menu-hover: #000;
  --navbar-item-text-enabled: #716b7c;
  --navbar-item-text-hover: #000;
  --navbar-item-border-enabled: #cfcdd4;
  --navbar-item-border-hover: #000;
  --usermenu-item-text-enabled: #43404a;
  --usermenu-item-border-enabled: #43404a;
}
`

const DARK_THEME = `
:root {
  /* global */
  --background: #18141a;
  --danger: #ffa900;
  --error: #ff0000;

  /* buttons */
  --primary: #ff2d55;
  --secondary: #242129;
  --primary-hover: #ff3d61;
  --secondary-hover: #28262c;

  /* within modals */
  --secondary-on-modal: #67637033;
  --secondary-on-modal-hover: #6763704d;
  --card-on-modal: #67637033;

  /* text */
  --text: #ffffff;
  --secondary-text: #676370;
  --text-on-primary: #ffffff;
  --text-on-secondary: #ffffff;

  /* ui */
  --divider: #67637033;
  --dropdown: #716b7c;
  --dropdown-hover: #24212933;
  --popup: #676370;
  --popup-text: #ffffff;
  --navbar-popup: #242129;
  --navbar-popup-hover: #67637033;
  --card: #242129;
  --outline: 1px solid #00000005;
  --toast: #3d3b43;
  --toast-text: #ffffff;
  --modal: #242129;
  --dimmer: #000000dd;
  --text-area-border: #676370;
  --clear-divider: #a09ba8;
  --navbar-icons: #fff;

  /* shadows */
  --shadow-1: 0px 2px 4px 0px rgba(0, 0, 0, 0.16);
  --shadow-2: 0px 10px 20px 0px rgba(0, 0, 0, 0.24);
  --shadow-3: 0px 16px 32px 0px rgba(0, 0, 0, 0.32);
  --shadow-4: 0px 8px 16px 12px rgba(0, 0, 0, 0.8);

  --shadow-color-1: 0px 2px 4px 0px rgba(0, 0, 0, 0.16);
  --shadow-color-2: 0px 10px 20px 0px rgba(0, 0, 0, 0.24);
  --shadow-color-3: 0px 16px 32px 0px rgba(0, 0, 0, 0.32);

  /* svgs */
  --brightness: brightness(100);
  /* black svgs */

  --notification-onboarding-bell: url(../../assets/bell-onboarding-dark.png);

  /* Navbar2 */
  --navbar-menu-enabled: #ecebed;
  --navbar-menu-hover: #fff;
  --navbar-item-text-enabled: #cfcdd4;
  --navbar-item-text-hover: #fff;
  --navbar-item-border-enabled: #716b7c;
  --navbar-item-border-hover: #cfcdd4;
  --usermenu-item-text-enabled: #cfcdd4;
  --usermenu-item-border-enabled: #cfcdd4;
}
`

type MaybeIE8StyleElement = HTMLStyleElement & {
  styleSheet?: {
    cssText: string
  }
}

function addStyle(id: string, css: string) {
  removeStyle('switch-theme')
  const head = document.head || document.getElementsByTagName('head')[0]
  const style = document.createElement('style') as MaybeIE8StyleElement

  style.id = id
  style.type = 'text/css'

  if (style.styleSheet) {
    // This is required for IE8 and below.
    style.styleSheet.cssText = css
  } else {
    style.appendChild(document.createTextNode(css))
  }

  head.appendChild(style)
}

function removeStyle(id: string) {
  const element = document.getElementById(id)
  if (element) {
    element.remove()
  }
}

let persistedValue = true

export const ThemePicker = () => {
  const [value, setValue] = useState(persistedValue)

  const handleClick = useCallback(() => setValue(!value), [value])

  useEffect(() => {
    addStyle('theme', value ? DARK_THEME : LIGHT_THEME)
    persistedValue = value
  }, [value])

  return (
    <div className="switch-theme" onClick={handleClick}>
      <Icon name={value ? 'moon' : 'sun'} />
      <Radio
        toggle
        checked={value}
        name="theme"
        id="theme-toggle"
        aria-label="Theme"
      />
    </div>
  )
}
