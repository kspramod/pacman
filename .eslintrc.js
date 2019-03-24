const config = {
  extends: "eslint:recommended",
  rules: {
    "comma-dangle": ["error", "never"],
    "semi": [2, "never"],
    "quotes": [2, "single", {"avoidEscape": true}],
  },
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true
  },
  "globals": {
    browser: true
  },
  parser: "babel-eslint",
  parserOptions: {
    "sourceType": "module"
  }
}

module.exports = config;
