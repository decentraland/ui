import initStoryshots, {
  Stories2SnapsConverter
} from '@storybook/addon-storyshots'
import { imageSnapshot } from '@storybook/addon-storyshots-puppeteer'
import * as path from 'path'
const getGotoOptions = ({ context, url }) => {
  return {
    waitUntil: 'networkidle0'
  }
}
const staticStorybookUrl = path.resolve(__dirname, '../../storybook-static')
const visualTest = {
  suite: 'Decentraland UI - Visual Tests',
  test: imageSnapshot({
    storybookUrl: `file://${staticStorybookUrl}`,
    getGotoOptions
  }),
  stories2snapsConverter: new Stories2SnapsConverter({
    snapshotsDirName: '__visual_snapshots__',
    snapshotExtension: '.storyshot',
    storiesExtensions: ['.js', '.jsx', '.ts', '.tsx']
  })
}
initStoryshots(visualTest)
