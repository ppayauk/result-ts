/* eslint-disable */
let base = require('./eslintrc.standard.js')
const functional_rules = {
  ...base.rules,
  'functional/no-conditional-statement': [
    'error',
    { allowReturningBranches: true },
  ],
}
const base_test_config = base.overrides.find((override) => {
  return (
    override.files.find((file) => {
      return (file = '**/*.test.ts')
    }) || false
  )
})

module.exports = {
  ...base,
  rules: functional_rules,
  extends: [
    ...base.extends,
    'plugin:functional/external-recommended',
    'plugin:functional/recommended',
    'plugin:functional/stylistic',
  ],
  plugins: [...base.plugins, 'functional'],
  overrides: [
    ...base.overrides,
    {
      files: ['**/*.test.ts', '**/*.test.tsx'],
      extends: base_test_config.extends,
      rules: {
        ...base_test_config.rules,
        'functional/no-expression-statement': 'off',
        'functional/functional-parameters': 'off',
        'functional/functional-parameters': 'off',
        'functional/no-conditional-statement': 'off',
        'functional/no-throw-statement': 'off',
      },
    },
    {
      files: ['**/*.tsx'],
      rules: {
        'functional/no-expression-statement': 'off',
        'functional/functional-parameters': 'off',
      },
    },
  ],
}
