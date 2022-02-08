// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  collectCoverage: true,
  coverageDirectory: './docs/',
  coverageProvider: 'babel',
  coverageReporters: ['lcov', ['text', {skipFull: true}]],
  errorOnDeprecated: true,
  globals: {},
  verbose: true,
};
