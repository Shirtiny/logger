/*
 * @Author: Shirtiny
 * @Date: 2021-06-11 10:01:14
 * @LastEditTime: 2021-06-23 16:37:09
 * @Description:
 */

module.exports = {
  root: true,
  env: {
    node: true,
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier"],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
  },
  extends: ["plugin:prettier/recommended"],
  rules: {
    // 不符prettier的地标出警告
    "prettier/prettier": "off",
  },
};
