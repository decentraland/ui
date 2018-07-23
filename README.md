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
<link href="https://ui.decentraland.org/styles.css" rel="stylesheet">
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
  --primary: #ff0044;
  --primary-light: #ff9a74;
  --primary-dark: #d10038;
  --secondary: #f2f2f5;
  --accent: #00d9ff;
  --background: #ffffff;
  --danger: #ffa900;

  /* text */
  --text: #0a0f1f;
  --secondary-text: #7d8499;
  --text-on-primary: #ffffff;
  --text-on-secondary: #0a0f1f;

  /* borders */
  --radius: 8px;
  --outline: #e0e2e8;
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

## CI/CD

We run coverage + visual tests on CircleCI for every PR. When merged to master we send coverage reports to CodeCov, deploy automatically to [ui.decentraland.org](https://ui.decentraland.org) and release a new version via `semantic-release` 
