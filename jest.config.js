module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '.*\\.ts$': 'ts-jest'
  },
  collectCoverageFrom: [
    "!src/presentation/protocols/**",
    "!src/presentation/controllers/signup/protocols.ts"
  ],
}
