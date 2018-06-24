// load the default config generator.
const genDefaultConfig = require('../webpack.config.js')
module.exports = { ...genDefaultConfig, externals: {} }
