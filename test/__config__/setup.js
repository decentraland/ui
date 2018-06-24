const registerRequireContextHook = require('babel-plugin-require-context-hook/register')
registerRequireContextHook()

require.context = __requireContext
