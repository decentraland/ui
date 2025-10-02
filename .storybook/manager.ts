import { addons } from '@storybook/manager-api'
import { create } from '@storybook/theming'

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'UI | Decentraland',
    brandUrl: 'https://decentraland.org',
    brandImage: 'https://ui.decentraland.org/color_dark_text.png'
  })
})
