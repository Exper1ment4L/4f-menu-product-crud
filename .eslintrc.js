module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    'react/prop-types': 0,
  },
  parser: 'babel-eslint',
  extends: ['eslint:recommended', 'plugin:react/recommended'],
};
