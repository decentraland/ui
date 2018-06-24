import initStoryshots from '@storybook/addon-storyshots'
import { imageSnapshot } from '@storybook/addon-storyshots-puppeteer'
import * as path from 'path'
const getGotoOptions = ({ context, url }) => {
  return {
    waitUntil: 'networkidle0'
  }
}
const staticStorybookUrl = path.resolve(__dirname, '../storybook-static')
const visualTest = {
  suite: 'Decentraland UI',
  test: imageSnapshot({
    storybookUrl: `file://${staticStorybookUrl}`,
    getGotoOptions
  })
}
initStoryshots(process.env.VISUAL_TEST ? visualTest : undefined)
