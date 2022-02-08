module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    ecmaFeatures: {
      legacyDecorators: true,
      jsx: true
    },
    project: './tsconfig.json',
    sourceType: 'module'
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'airbnb-base',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:jest/recommended',
    'plugin:prettier/recommended'
  ],
  plugins: ['react', '@typescript-eslint', 'jest'],
  rules: {
    'react/jsx-props-no-spreading': 0,
    'import/prefer-default-export': 0,
    'react/no-array-index-key': 0,
    'no-param-reassign': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/interactive-supports-focus': 0,
    'import/no-cycle': 0,
    'react/prop-types': 0,
    'react/button-has-type': 0,
    'react/no-unused-prop-types': 0,
    'global-require': 0,
    'no-nested-ternary': 0
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
