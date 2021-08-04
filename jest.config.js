module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**',
    '!<rootDir>/src/@types/**',
    '!<rootDir>/src/presentation/protocols/**',
    '!<rootDir>/src/presentation/controllers/signup/protocols.ts',
    '!<rootDir>/src/presentation/controllers/login/protocols.ts',
    '!<rootDir>/src/data/useCase/addAccount/protocols.ts'
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  preset: '@shelf/jest-mongodb',
  transform: {
    '.*\\.ts$': 'ts-jest'
  },
}
