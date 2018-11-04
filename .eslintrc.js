module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: 'eslint:recommended',
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2015,
    sourceType: 'module',
  },
  rules: {
    indent: [
      'error',
      2,
    ],
    'linebreak-style': [
      'error',
      'unix',
    ],
    quotes: ['error', 'single', {allowTemplateLiterals: true}],
    semi: [
      'error',
      'always',
    ],
    'no-unused-vars': 0,
    'no-console': 1,
    'object-curly-spacing': [
      'error',
      'always',
      {objectsInObjects: false, arraysInObjects: false},
    ],
    'key-spacing': [
      'error',
      {afterColon: true, beforeColon: false, mode: 'strict'}],
  },
};