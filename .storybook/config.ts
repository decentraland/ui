// @ts-ignore
import { addParameters, configure, addDecorator } from '@storybook/react'
import { create } from '@storybook/theming'

addParameters({
  options: {
    theme: create({
      base: 'light',

      brandTitle: 'UI | Decentraland',
      brandUrl: 'https://decentraland.org',
      brandImage: 'https://i.imgur.com/lCurOg0.png'
    })
  }
})

// automatically import all files ending in *.stories.tsx in /stories
const req = require.context('../src/components', true, /.stories.tsx?$/)

function loadStories() {
  req.keys().forEach(req)
}

configure(loadStories, module)
