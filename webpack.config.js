/*eslint-env node*/
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const postcssPresetEnv = require('postcss-preset-env')
const postcssAssets = require('postcss-assets')
const postcssCopy = require('postcss-copy')
const postcss = require('postcss')
const path = require('path')

const srcPath = path.resolve(__dirname, 'src')

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'index.js',
    library: 'decentralandUI',
    libraryTarget: 'umd',
    clean: true
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
      root: 'React'
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 1 } },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  postcssPresetEnv({
                    stage: 4
                  })
                ]
              }
            }
          }
        ]
      },
      {
        test: /\.tsx?$/,
        use: ['ts-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource'
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8192
          }
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css'
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/assets',
          to: 'assets'
        },
        {
          from: 'src/themes/alternative',
          to: './',
          // transform themes file because now they contain a relative path to the assets
          transform: (content, path) => {
            return postcss([
              postcssPresetEnv({
                stage: 4
              }),
              postcssAssets({
                loadPaths: ['src/assets', 'src/images'],
                basePath: srcPath,
                baseUrl: 'assets/'
              }),
              postcssCopy({
                dest: './lib/'
              })
            ])
              .process(content, { from: path })
              .then((result) => {
                return result.css
              })
          }
        }
      ]
    })
  ]
}
