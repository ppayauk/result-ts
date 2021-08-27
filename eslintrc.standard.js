/* eslint-disable */
let base = require('./eslintrc.legacy.js')

const standard_rules = {
  ...base.rules,
  semi: 'off',
  'import/no-default-export': 'error',
  'import/prefer-default-export': 'off',
  'react/destructuring-assignment': 'off',
  'react/jsx-props-no-spreading': 'off',
  'react/jsx-filename-extension': 'off',
  'func-style': 'error',
  'func-names': 'error',
  'unicorn/prevent-abbreviations': 'off',
  'unicorn/no-array-for-each': 'off',
  'unicorn/filename-case': 'off',
  'unicorn/no-array-callback-reference': 'off',
  '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  'jsx-a11y/label-has-associated-control': ['error', { assert: 'either' }],
  'react/prop-types': 'off',
  '@typescript-eslint/naming-convention': [
    'error',
    {
      selector: 'interface',
      format: ['PascalCase'],
      custom: {
        regex: '^I[A-Z]',
        match: false,
      },
    },
  ],
}

const extendsBase = [
  ...base.extends,
  'airbnb-typescript',
  'plugin:@typescript-eslint/recommended',
  'plugin:jest/recommended',
  'plugin:eslint-comments/recommended',
  'plugin:@typescript-eslint/recommended-requiring-type-checking',
  'plugin:promise/recommended',
  'plugin:unicorn/recommended',
  'prettier',
]
module.exports = {
  ...base,
  extends: [...extendsBase],
  plugins: [...base.plugins, 'promise', 'unicorn'],
  rules: { ...standard_rules },
  overrides: [
    {
      files: ['**/*.test.ts', '**/*.test.tsx'],
      extends: [...extendsBase],
      rules: {
        ...standard_rules,
        'jest/expect-expect': 'off',
        'jest/no-conditional-expect': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        'unicorn/consistent-function-scoping': 'off',
      },
    },
  ],
}
