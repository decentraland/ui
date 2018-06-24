import initStoryshots, {
  Stories2SnapsConverter
} from '@storybook/addon-storyshots'
const coverageTest = {
  suite: 'Decentraland UI - Coverage Tests',
  stories2snapsConverter: new Stories2SnapsConverter({
    snapshotsDirName: '__coverage_snapshots__',
    snapshotExtension: '.storyshot',
    storiesExtensions: ['.js', '.jsx', '.ts', '.tsx']
  })
}
initStoryshots(coverageTest)
