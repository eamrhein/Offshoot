module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  extends: [
    'standard',
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [
    'react',
    'node'
  ],
  rules: {
    semi: [2, "always"],
    "react/jsx-filename-extension": 0,
    "react/jsx-uses-vars": 2,
    "react/prop-types": 0,
    "import/prefer-default-export": 0,
    "no-console": 0
  }
}
