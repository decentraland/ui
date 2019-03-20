const { configure, addDecorator } = require('@storybook/react')
const centered = require('@storybook/addon-centered').default
const { withOptions } = require('@storybook/addon-options')

let themeSwitcher
let darkTheme
let lightTheme
if (process.env.NODE_ENV !== 'test') {
  themeSwitcher = require('../addons/themes').default
  darkTheme = require('../src/themes/alternative/dark-theme.css')
  lightTheme = require('../src/themes/alternative/light-theme.css')
}

withOptions({
  name: 'decentraland-ui',
  url: 'https://github.com/decentraland/ui',
  goFullScreen: false,
  showStoriesPanel: true,
  showAddonPanel: true,
  showSearchBox: false,
  addonPanelInRight: false,
  sortStoriesByKind: false,
  hierarchySeparator: null,
  hierarchyRootSeparator: null,
  sidebarAnimations: true,
  selectedAddonPanel: undefined,
  enableShortcuts: false // true by default
})

addDecorator(centered)
if (process.env.NODE_ENV !== 'test') {
  let checked = false
  addDecorator(
    themeSwitcher(
      darkTheme,
      lightTheme,
      () => checked,
      value => (checked = value)
    )
  )
}

// this is to make storyshots work (and jest in general) because it lacks webpack's require.context function
if (!require.context) {
  require.context = (directory, useSubdirectories, regExp = /^\.\//) =>
    __requireContext('.storybook', directory, useSubdirectories, regExp)
}

// automatically import all files ending in *.stories.js
const req = require.context('../src/components', true, /.stories.tsx?$/)
function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
