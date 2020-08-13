module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    semi: 'off',
    'react/react-in-jsx-scope': 'off',
  },
};
