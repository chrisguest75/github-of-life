module.exports = {
    transform: {
      '^.+\\.ts?$': 'ts-jest'
    },
    testEnvironment: 'node',
    testRegex: 'tests/.*\\.(test|spec)?\\.(ts|tsx|js)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    reporters: [ "default", "jest-junit" ]
  };