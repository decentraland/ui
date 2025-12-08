const postcssPresetEnv = require('postcss-preset-env')

module.exports = {
  stories: [
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    '@storybook/addon-storysource',
    '@storybook/addon-a11y',
    '@storybook/addon-essentials'
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {
      builder: {
        useSWC: false,
      },
    }
  },
  typescript: {
    reactDocgen: false,
    check: false,
  },
  core: {
    disableTelemetry: true,
  },
  webpackFinal: async (config) => {
    const path = require('path')

    // Remove problematic plugins to avoid Webpack 4/5 version conflicts
    config.plugins = config.plugins?.filter(
      (plugin) => {
        const name = plugin?.constructor?.name
        return name !== 'ReactDocgenTypeScriptPlugin' &&
               name !== 'ForkTsCheckerWebpackPlugin'
      }
    )

    // Add resolve configuration to properly handle src directory
    config.resolve = config.resolve || {}
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../src')
    }
    config.resolve.modules = [
      ...(config.resolve.modules || []),
      path.resolve(__dirname, '../src'),
      'node_modules'
    ]

    // Find and update CSS rules
    const cssRuleIndex = config.module.rules.findIndex(rule =>
      rule.test && rule.test.toString().includes('css')
    )

    if (cssRuleIndex !== -1) {
      // Remove the default rule
      config.module.rules.splice(cssRuleIndex, 1)

      // Add separate rules for src and node_modules
      config.module.rules.push(
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            'style-loader',
            { loader: 'css-loader', options: { importLoaders: 1, url: false } },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [postcssPresetEnv({ stage: 4 })]
                }
              }
            }
          ]
        },
        {
          test: /\.css$/,
          include: /node_modules/,
          use: [
            'style-loader',
            { loader: 'css-loader', options: { url: false } }
          ]
        }
      )
    }

    return config
  },
}

