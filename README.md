# Decentraland UI [![codecov](https://codecov.io/gh/decentraland/ui/branch/master/graph/badge.svg)](https://codecov.io/gh/decentraland/ui) [![CircleCI](https://circleci.com/gh/decentraland/ui.svg?style=svg)](https://circleci.com/gh/decentraland/ui) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

`semantic-ui-react` themed with Decentrland's look & feel + some of our own components

## Usage

Import Decentraland UI's styles in your App's entry point

```jsx
import 'decentraland-ui/lib/decentraland-ui.css'
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
  --primary: #ff0000;
  --secondary: #ff0000;
  --accent: #ff0000;
  --text: #ff0000;
  --secondary-text: #ff0000;
  --radius: 8px;
  --primary-button-text: #ff0000;
  --primary-button-background: #ff0000;
  --primary-button-text-active: #ff0000;
  --primary-button-background-active: #ff0000;
  --secondary-button-text: #ff0000;
  --secondary-button-background: #ff0000;
  --secondary-button-text-active: #ff0000;
  --secondary-button-background-active: #ff0000;
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

## CI/CD

We run coverage + visual tests on CircleCI for every PR. When merged to master we send coverage reports to CodeCov, deploy automatically to `now.sh` and release a new version via `semantic-release`
