import initStoryshots, {
  Stories2SnapsConverter
} from '@storybook/addon-storyshots'

/*
  Components that should be skipped from this test suite
*/
const blacklist = ['Modal', 'Popup']

const coverageTest = {
  suite: 'Decentraland UI - Coverage Tests',
  stories2snapsConverter: new Stories2SnapsConverter({
    snapshotsDirName: '__coverage_snapshots__',
    snapshotExtension: '.storyshot',
    storiesExtensions: ['.js', '.jsx', '.ts', '.tsx']
  }),
  storyKindRegex:
    blacklist.length === 0
      ? undefined
      : new RegExp(`^(?!(${blacklist.join('|')}))`)
}

initStoryshots(coverageTest)
