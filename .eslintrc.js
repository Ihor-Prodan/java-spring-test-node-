module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'prettier/prettier': 'error',
  },
  env: {
    node: true,
    es6: true,
  },
};
