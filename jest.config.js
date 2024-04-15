/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleDirectories: ['packages', 'node_modules'],
  collectCoverage: true,
  coverageReporters: ['text'],
  moduleNameMapper: {
    uuid: require.resolve('uuid'),
  },
  // setupFilesAfterEnv: ['./jest.setup.js']
};
