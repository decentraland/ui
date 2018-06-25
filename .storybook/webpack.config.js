// load the default config generator.
const genDefaultConfig = require('../webpack.config.js')
module.exports = {
  ...genDefaultConfig,
  externals: {},
  module: {
    ...genDefaultConfig.module,
    rules: [
      {
        test: /\.stories\.(ts|js|jsx|tsx)?$/,
        loaders: [
          {
            loader: require.resolve('@storybook/addon-storysource/loader'),
            options: {
              prettierConfig: {
                parser: 'babylon'
              }
            }
          }
        ],
        enforce: 'pre'
      },
      ...genDefaultConfig.module.rules
    ]
  }
}
