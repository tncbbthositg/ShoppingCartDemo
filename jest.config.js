/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest',
  collectCoverage: true,
  coverageReporters: ["clover", "json", "lcov", "text", "json-summary"],
  testEnvironment: 'jsdom',
  testMatch: [
    "**/*.test.{ts,tsx}",
  ]
}
