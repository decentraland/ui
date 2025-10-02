import type { StorybookConfig } from '@storybook/react-webpack5'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-storysource',
    '@storybook/addon-a11y',
    '@storybook/addon-essentials'
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },
  typescript: {
    reactDocgen: false
  },
  webpackFinal: async (config) => {
    // Don't externalize react-dom/client - it's needed for Storybook 8
    // config.externals = ["react-dom/client"];

    // Ensure module and rules exist
    if (!config.module) {
      config.module = { rules: [] }
    }
    if (!config.module.rules) {
      config.module.rules = []
    }

    // Add resolve configuration
    if (!config.resolve) {
      config.resolve = {}
    }
    if (!config.resolve.alias) {
      config.resolve.alias = {}
    }

    // Add alias for semantic-ui-react
    config.resolve.alias['semantic-ui-react'] =
      require.resolve('semantic-ui-react')

    // Add fallback for node modules
    if (!config.resolve.fallback) {
      config.resolve.fallback = {}
    }
    config.resolve.fallback['fs'] = false
    config.resolve.fallback['path'] = false

    // Add ts-loader for TypeScript files
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            configFile: 'tsconfig.json'
          }
        }
      ]
    })

    // Add file-loader for images with unique names
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'assets/[name].[hash][ext]'
      }
    })

    // Override CSS rules to prevent postcss conflicts
    const cssRuleIndex = config.module.rules.findIndex(
      (rule) =>
        rule &&
        typeof rule === 'object' &&
        'test' in rule &&
        rule.test &&
        rule.test.toString().includes('css')
    )

    if (cssRuleIndex !== -1) {
      config.module.rules[cssRuleIndex] = {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              url: {
                filter: (url: string) => {
                  // Allow all URLs to be processed
                  return true
                }
              }
            }
          }
        ]
      }
    }

    return config
  }
}

export default config
