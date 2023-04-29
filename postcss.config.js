/*eslint-env node*/
module.exports = {
  plugins: {
    'autoprefixer': true,
    'postcss-svg': true,
    'postcss-assets': true,
    'postcss-copy': {
      'basePath': [`${__dirname}/src`],
      'preservePath': true,
      'dest': `${__dirname}/dist/assets`
    }
  }
}
