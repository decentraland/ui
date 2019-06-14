const webpackConfig = require('../webpack.config')
const cssRule = webpackConfig.module.rules[0]

module.exports = ({ config }) => {
  config.module.rules = [
    // replace mini-css-extract-plugin with style-loader
    {
      test: /\.css$/,
      use: ['style-loader', ...cssRule.use.slice(1)]
    },
    ...webpackConfig.module.rules.slice(1)
  ]
  config.resolve.extensions.push('.ts', '.tsx')
  config.module.rules.push({
    test: /\.stories\.tsx?$/,
    loaders: [
      {
        loader: require.resolve('@storybook/addon-storysource/loader'),
        options: { parser: 'typescript' }
      }
    ],
    enforce: 'pre'
  })
  return config
}
