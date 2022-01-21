import * as React from 'react'
import { makeDecorator } from '@storybook/addons'
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

  /* shadows */
  --shadow-1: 0px 2px 4px 0px rgba(0, 0, 0, 0.08);
  --shadow-2: 0px 10px 20px 0px rgba(0, 0, 0, 0.12);
  --shadow-3: 0px 16px 32px 0px rgba(0, 0, 0, 0.16);

  --shadow-color-1: 0px 2px 4px 0px rgba(0, 0, 0, 0.16);
  --shadow-color-2: 0px 10px 20px 0px rgba(0, 0, 0, 0.2);
  --shadow-color-3: 0px 16px 32px 0px rgba(0, 0, 0, 0.24);

  /* svgs */
  --brightness: brightness(0.1); /* black svgs */
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
  --dropdown: #676370;
  --dropdown-hover: #24212933;
  --popup: #676370;
  --popup-text: #ffffff;
  --navbar-popup: #242129;
  --navbar-popup-hover: #67637033;
  --card: #242129;
  --outline: 1px solid #00000005;
  --toast: #38333d;
  --toast-text: #ffffff;
  --modal: #242129;
  --dimmer: #000000dd;

  /* shadows */
  --shadow-1: 0px 2px 4px 0px rgba(0, 0, 0, 0.16);
  --shadow-2: 0px 10px 20px 0px rgba(0, 0, 0, 0.24);
  --shadow-3: 0px 16px 32px 0px rgba(0, 0, 0, 0.32);

  --shadow-color-1: 0px 2px 4px 0px rgba(0, 0, 0, 0.16);
  --shadow-color-2: 0px 10px 20px 0px rgba(0, 0, 0, 0.24);
  --shadow-color-3: 0px 16px 32px 0px rgba(0, 0, 0, 0.32);

  /* svgs */
  --brightness: brightness(100); /* black svgs */
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

const ThemePicker = () => {
  const [value, setValue] = useState(persistedValue)

  const handleClick = useCallback(() => setValue(!value), [value])

  useEffect(() => {
    addStyle('theme', value ? DARK_THEME : LIGHT_THEME)
    persistedValue = value
  }, [value])

  return (
    <div className="switch-theme" onClick={handleClick}>
      <Icon name={value ? 'moon' : 'sun'} />
      <Radio toggle checked={value}></Radio>
    </div>
  )
}

export default makeDecorator({
  name: 'ThemePicker',
  parameterName: 'themePicker',
  wrapper: (getStory, context) => (
    <>
      <ThemePicker />
      {getStory(context)}
    </>
  )
})
