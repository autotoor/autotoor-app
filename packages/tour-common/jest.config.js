module.exports = {
  cacheDirectory: '<rootDir>/.cache/unit-tests',
  coverageReporters: [['lcov', { projectRoot: '/' }], 'text-summary'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    '<rootDir>/test/**/*.test.ts',
    '<rootDir>/src/**/*.test.ts',
    '<rootDir>/src/**/*.spec.ts',
    '<rootDir>/test/**/*-spec.ts',
  ],
  reporters: ['default'],
};
