module.exports = {
  extends: [
    "tencent",
    "tencent/ts"
  ],
  env: {
    node: true
  },
  rules: {
    "no-param-reassign": ["error", { props: true, ignorePropertyModificationsFor: ['t'] }],
    "@typescript-eslint/semi": ["error", "never"]
  }
}
