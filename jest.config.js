/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest',
  collectCoverage: true,
  coverageReporters: ["clover", "json", "lcov", "text", "json-summary"],
  testEnvironment: 'jsdom',
  "setupFilesAfterEnv": [
    "<rootDir>/__tests__/testSetup.ts",
  ],
  testMatch: [
    "**/*.test.{ts,tsx}",
  ]
}
