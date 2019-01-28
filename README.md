# Decentraland UI [![codecov](https://codecov.io/gh/decentraland/ui/branch/master/graph/badge.svg)](https://codecov.io/gh/decentraland/ui) [![CircleCI](https://circleci.com/gh/decentraland/ui.svg?style=svg)](https://circleci.com/gh/decentraland/ui) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

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

Now you can use Decentraland UI's components

```jsx
import React from 'react'
import { Button } from 'decentraland-ui'

export class MyApp extends React.Component {
  render() {
    return <Button>Sabe</Button>
  }
}
```

### Without React

You can also use `decentraland-ui` as a CSS framework just by adding this tag in your `<head>`:

```html
<link href="https://ui.decentraland.org/styles.css" rel="stylesheet" />
```

And then using [Semantic UI](https://semantic-ui.com/) classes like this:

```html
<button class="ui button">Sabe</button>
```

🏌

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
  /* colors */
  --primary: #ff2d55;
  --primary-light: #ff9a74;
  --primary-dark: #d10038;
  --secondary: #272329;
  --accent: #00d9ff;
  --background: #18141a;
  --danger: #ffa900;

  /* text */
  --text: #ffffff;
  --secondary-text: #676370;
  --disabled-text: #676370;
  --text-on-primary: #ffffff;
  --text-on-secondary: #ffffff;

  /* borders */
  --radius: 6px;
  --outline: #272329;
  --border: #00000005;

  /* cards */
  --card-background: #272329;

  /* hover */
  --hover: #353135;

  /* shadows */
  --shadow: #0000001f;

  /* svgs */
  --brightness: brightness(100); /* white svgs */
}
```

## Development

Install dependencies and start Storybook

```
$ npm install
$ npm start
```

## Tests

Run coverage tests:

```
npm run test:coverage
```

Run visual tests

```
npm run test:visual
```

To update the snapshots add `-- -u` after the test you want to update, i.e: `npm run test:visual -- -u`

**IMPORTANT**

You need to `npm run build:storybook` before running `npm run test:visual`!

**BLACKLIST**

Each test suite has a `blacklist` array with component names that should be skipped from the test. If you add a component that for some reason needs to be skipped (ie. `Modal`, because `react-test-renderer` doesn't support refs) you can add them to one of the blacklists.

They can be found here:

- Coverage Test Suite: `test/coverage/coverage.test.ts`

- Visual Test Suite: `test/visual/visual.test.ts`

This is an example:

```tsx
/*
  Components that should be skipped from this test suite
*/
const blacklist = ['Modal']
```

## CI/CD

We run coverage + visual tests on CircleCI for every PR. When merged to master we send coverage reports to CodeCov, deploy automatically to [ui.decentraland.org](https://ui.decentraland.org) and release a new version via `semantic-release`
