export default {
  rootDir: '.',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|scss|sass)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'babel-jest',
    "^.+\\.(js|jsx|mjs|ts|tsx)$": "babel-jest",
  },
  transformIgnorePatterns: [
    '<rootDir>/node_modules/',
  ],
  testEnvironment: 'jest-environment-node',
  setupFilesAfterEnv: [
    '<rootDir>/jest.setup.js',
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
  ],
  coverageDirectory: '<rootDir>/coverage',
  testEnvironment: "jsdom", 
  transform: {}, 
  moduleNameMapper: {
    "\\.(css|scss|sass)$": "<rootDir>/src/test/mocks/styleMock.js"
  }
};
