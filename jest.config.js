const rnPreset = require('react-native/jest-preset');

module.exports = {
  ...rnPreset,
  modulePathIgnorePatterns: [
    '<rootDir>/example/node_modules',
    '<rootDir>/lib/',
  ],
};
