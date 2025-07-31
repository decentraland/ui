module.exports = {
  webpackFinal: async (config) => {
    // Remove conflicting externals that cause issues
    delete config.externals

    // Add custom rules for our project
    config.module.rules.push(
      {
        test: [/\.stories\.(jsx?$|tsx?$)/],
        enforce: 'pre',
        use: [{ loader: require.resolve('@storybook/source-loader') }]
      },
      {
        test: /\.tsx?$/,
        use: ['ts-loader']
      }
    )

    // Ensure webpack 5 compatibility
    config.resolve = config.resolve || {}
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      os: false
    }

    return config
  },

  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: [
    '@storybook/addon-storysource',
    '@storybook/addon-a11y',
    '@storybook/addon-essentials'
  ],

  framework: {
    name: '@storybook/react-webpack5',
    options: {
      builder: '@storybook/builder-webpack5'
    }
  },

  features: {
    buildStoriesJson: true,
    storyStoreV7: false
  },

  typescript: {
    reactDocgen: 'react-docgen'
  }
}
