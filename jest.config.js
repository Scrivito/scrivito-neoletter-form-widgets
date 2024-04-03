module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    "^lodash-es$": "lodash"
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        diagnostics: {
          ignoreCodes: [1343]
        },
        astTransformers: {
          before: [
            {
              path: 'ts-jest-mock-import-meta'
            }
          ]
        }
      }
    ],
    '^.+\\.scss$': 'jest-transform-stub',
    '^.+\\.(js|jsx|mjs)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(lodash-es)/)', // Don't ignore lodash-es
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['<rootDir>/test/setupTests.ts'],
};
