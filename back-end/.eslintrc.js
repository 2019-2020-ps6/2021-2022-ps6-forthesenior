module.exports = {
  extends: 'airbnb-base',
  env: {
    jest: true,
    node: true,
  },
  rules: {
    'max-len': ['error', 200, {'ignoreStrings': true}],
    'no-underscore-dangle': ['error', {'allow': ['_id']}],
    'semi': ['error', 'never'],
    'linebreak-style': ['error', process.platform === 'win32' ? 'windows' : 'unix'],
  }
};
