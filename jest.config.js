// https://github.com/facebook/jest/issues/9395#issuecomment-583799300

// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  collectCoverage: true,
  coverageDirectory: './docs/',
  coverageProvider: 'babel',
  coverageReporters: ['lcov', ['text', {skipFull: true}]],
  errorOnDeprecated: true,
  globals: {},
  transform: {'^.+\\.jsx?$': 'babel-jest'},
  verbose: true,
};
