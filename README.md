<img src="https://ui.decentraland.org/decentraland_256x256.png" height="128" width="128" />

# Decentraland UI [![CircleCI](https://circleci.com/gh/decentraland/ui.svg?style=svg)](https://circleci.com/gh/decentraland/ui) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

This is basically `semantic-ui-react` themed with Decentrland's look & feel + some of our own components

See: [ui.decentraland.org](https://ui.decentraland.org)

## Usage

Install it:

```bash
npm install --save decentraland-ui
```

Import Decentraland UI's styles in your App's entry point

```jsx
import 'decentraland-ui/lib/styles.css'
```

Now you can use Decentraland UI's components:

```jsx
import React from 'react'
import { Button } from 'decentraland-ui'

export class MyApp extends React.Component {
  render() {
    return <Button>Sabe</Button>
  }
}
```

### AddressField recipient changes

`AddressField` invalidates a previously resolved or prefilled recipient immediately
when the user edits it. Changing `resolverKey` also invalidates a previously resolved
name; raw addresses are unaffected by key changes. Its `onChange` callback receives
`{ value: '', pending: true, error: undefined }`, followed by the resolution result
with `pending: false`. Change `resolverKey` when the chain or resolver configuration
changes; a new inline `resolveName` callback alone does not trigger a refresh.

Clearing the field now emits `{ value: '', pending: false, error: undefined }`
immediately. Previously it reported `INVALID_ADDRESS_OR_NAME` after the debounce.
An absent error alone does **not** mean that a recipient is ready. Always clear
stored recipients on empty values, including pending notifications; do not guard
updates with `if (data.value)`, which would retain the previous recipient.

Use `AddressFieldChangeData` for the actual callback payload (the legacy default
callback type retains its boolean `error` annotation for source compatibility):

```tsx
import { AddressFieldChangeHandler } from 'decentraland-ui'

const handleRecipientChange: AddressFieldChangeHandler = (_event, data) => {
  setRecipient(data.pending || data.error || !data.value ? '' : data.value)
}
// Disable submission while recipient is empty.
```

### Without React

You can also use `decentraland-ui` as a CSS framework just by adding this tag in your `<head>`:

```html
<link href="https://ui.decentraland.org/styles.css" rel="stylesheet" />
```

And then using [Semantic UI](https://semantic-ui.com/) classes like this:

```html
<button class="ui button">Click me!</button>
```

🏌

## Minimizing bundle size

You can import just the essential component and reduce the size of your bundles, like this:

```jsx
// import css
import 'semantic-ui-css/semantic.min.css'
import 'balloon-css/balloon.min.css'
import 'decentraland-ui/dist/themes/base-theme.css'
import 'decentraland-ui/dist/themes/alternative/light-theme.css'
// or import 'decentraland-ui/dist/themes/alternative/dark-theme.css'

// Then import just the components you will use
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid/Grid'
import { Button } from 'decentraland-ui/dist/components/Button/Button'
import { Card } from 'decentraland-ui/dist/components/Card/Card'
```

## Alternative themes

You can use one of our alternative themes by importing in after Decentraland UI's styles, like this:

```jsx
import 'decentraland-ui/lib/styles.css'
import 'decentraland-ui/lib/dark-theme.css'
```

Or you can create your own theme like this:

```css
/* my-theme.css */
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
  --clear-divider: #a09ba8;

  /* shadows */
  --shadow-1: 0px 2px 4px 0px rgba(0, 0, 0, 0.08);
  --shadow-2: 0px 10px 20px 0px rgba(0, 0, 0, 0.12);
  --shadow-3: 0px 16px 32px 0px rgba(0, 0, 0, 0.16);
  --shadow-4: 0px 8px 16px 12px rgba(0, 0, 0, 0.1);

  --shadow-color-1: 0px 2px 4px 0px rgba(0, 0, 0, 0.16);
  --shadow-color-2: 0px 10px 20px 0px rgba(0, 0, 0, 0.2);
  --shadow-color-3: 0px 16px 32px 0px rgba(0, 0, 0, 0.24);

  /* svgs */
  --brightness: brightness(0.1); /* black svgs */
}
```

## Development

Prerequisites: Node.js v16 (or compatible)

Install dependencies and start Storybook:

```
$ npm install
$ npm start
```

## CI/CD

We deploy automatically to [ui.decentraland.org](https://ui.decentraland.org) and release a new version via `semantic-release`.
