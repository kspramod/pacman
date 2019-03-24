const config = {
  extends: "airbnb",
  plugins: [
    "react-hooks"
  ],
  rules: {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "comma-dangle": ["error", "never"],
    "jsx-quotes": ["error", "prefer-single"],
    "space-before-function-paren": ["error", "always"],
    "generator-star-spacing": ["error", {"before": true, "after": true}],
    "semi": [2, "never"],
    "jsx-a11y/href-no-hash": "off",
    "jsx-a11y/anchor-is-valid": ["warn", { "aspects": ["invalidHref"] }],
  }
}

module.exports = config;