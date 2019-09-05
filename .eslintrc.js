module.exports = {
  extends: ["plugin:jest/recommended", "plugin:prettier/recommended"],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2018
  },
  rules: {
    "no-constant-condition": ["error", { checkLoops: false }],
    "require-atomic-updates": "off",
    "no-shadow": "error",
    "no-warning-comments": "error"
  }
};
