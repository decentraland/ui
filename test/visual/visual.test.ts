import initStoryshots, {
  Stories2SnapsConverter
} from '@storybook/addon-storyshots'
import { imageSnapshot } from '@storybook/addon-storyshots-puppeteer'
import * as path from 'path'

/*
  Components that should be skipped from this test suite
*/
const blacklist = []

const getGotoOptions = ({ context, url }) => {
  return {
    waitUntil: 'networkidle0'
  }
}
const getMatchOptions = ({ context: { kind, story }, url }) => {
  return {
    failureThreshold: 0.05,
    failureThresholdType: 'percent'
  }
}
const staticStorybookUrl = path.resolve(__dirname, '../../storybook-static')
const visualTest = {
  suite: 'Decentraland UI - Visual Tests',
  test: imageSnapshot({
    storybookUrl: `file://${staticStorybookUrl}`,
    getGotoOptions,
    getMatchOptions
  }),
  stories2snapsConverter: new Stories2SnapsConverter({
    snapshotsDirName: '__visual_snapshots__',
    snapshotExtension: '.storyshot',
    storiesExtensions: ['.js', '.jsx', '.ts', '.tsx']
  }),
  storyKindRegex:
    blacklist.length === 0
      ? undefined
      : new RegExp(`^(?!(${blacklist.join('|')}))`)
}
initStoryshots(visualTest)
