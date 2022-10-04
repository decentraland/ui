/*eslint-env node*/
module.exports = {
  plugins: {
    'autoprefixer': true,
    'postcss-svg': true,
    'postcss-assets': true,
    'postcss-copy': {
      dest: 'dist/assets'
    },
  }
}
