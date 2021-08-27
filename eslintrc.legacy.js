/* eslint-disable */
module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ['react-app', 'react-app/jest', 'prettier'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json',
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'eslint-comments', 'jest'],
  globals: {
    React: true,
    JSX: true,
  },
  root: true,
  ignorePatterns: ['**/*.js', '**/*.js'],
}
