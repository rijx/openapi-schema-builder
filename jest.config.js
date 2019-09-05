module.exports = {
  testEnvironment: "node",

  collectCoverageFrom: [
    "src/**/*.js",
    "!**/node_modules/**",
    "!**/__mocks__/**"
  ],

  coverageReporters: ["text-summary", "json", "html"],
  collectCoverage: true,
  coverageDirectory: "coverage/"
};
