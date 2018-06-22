# Decentraland UI

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
}
```

## Development

Install dependencies and start Storybook

```
$ npm install
$ npm start
```
