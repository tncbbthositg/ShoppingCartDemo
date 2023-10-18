/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  "setupFilesAfterEnv": [
    "<rootDir>/__tests__/testSetup.ts",
  ],
  testMatch: [
    "**/*.test.{ts,tsx}",
  ]
}
