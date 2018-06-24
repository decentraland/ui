const { configure, addDecorator } = require('@storybook/react')
const centered = require('@storybook/addon-centered').default
console.log(centered)
const { setOptions } = require('@storybook/addon-options')

setOptions({
  name: 'Decentraland',
  url: 'https://decentraland.org',
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

// this is to make storyshots work (and jest in general) because it lacks webpack's require.context function
if (!require.context) {
  const registerRequireContextHook = require('babel-plugin-require-context-hook/register')
  registerRequireContextHook()
  require.context = (directory, useSubdirectories, regExp = /^\.\//) =>
    __requireContext('.storybook', directory, useSubdirectories, regExp)
}

// automatically import all files ending in *.stories.js
const req = require.context('../src/components', true, /.stories.tsx?$/)
function loadStories() {
  req.keys().forEach(filename => req(filename))
}
configure(loadStories, module)
