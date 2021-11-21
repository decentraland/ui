/*eslint-env node*/
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  ignorePatterns: ['lib/**/*', 'dist/**/*'],
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  env: {
    browser: true,
    es6: true
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'no-restricted-imports': ['error', 'semantic-ui-react']
      }
    },
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off'
      }
    }
  ]
}
