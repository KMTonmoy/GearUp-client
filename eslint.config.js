import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import ts from '@typescript-eslint/eslint-plugin'

export default {
  ignores: ['dist'],
  extends: [
    js.configs.recommended,
    'plugin:@typescript-eslint/recommended', // Extends the recommended TypeScript rules
    'plugin:react/recommended', // React recommended config
    'plugin:react-hooks/recommended', // React hooks recommended config
  ],
  files: ['**/*.{ts,tsx}'],
  parser: '@typescript-eslint/parser', // Ensure TypeScript files are parsed correctly
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  globals: {
    ...globals.browser,
  },
  plugins: {
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
    '@typescript-eslint': ts, // The TypeScript ESLint plugin
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'off', // Example of a rule you might want to disable
  },
}
