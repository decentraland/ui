const webpackConfig = require('../webpack.config.js');
const cssRule = webpackConfig.module.rules[0]

module.exports = {
  webpackFinal: async (config) => {
    config.externals = ["react-dom/client"]
    config.module.rules = [
      {
        test: [/\.stories\.(jsx?$|tsx?$)/],
        enforce: "pre",
        use:[{ loader: require.resolve('@storybook/source-loader')}]
     },
      // replace mini-css-extract-plugin with style-loader
      {
        test: /\.css$/,
        use: ['style-loader', ...cssRule.use.slice(1)]
      },
      ...webpackConfig.module.rules.slice(1)
    ]
    return { ...config, module: { ...config.module, rules: config.module.rules } };
  },
  stories: [
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    '@storybook/addon-storysource',
    '@storybook/addon-a11y',
    '@storybook/addon-essentials'
  ],
  framework: "@storybook/react"
}

