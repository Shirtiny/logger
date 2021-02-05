import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import filesize from "rollup-plugin-filesize";
import commonjs from "@rollup/plugin-commonjs";
import json from '@rollup/plugin-json'

// rollup.config.js
export default {
  input: "src/test.js",
  output: {
    file: "test/index.js",
    format: "umd",
    indent: false,
    name: "ShLogTest",
  },
  plugins: [
    resolve(),
    commonjs(),
    filesize(),
    json(),
    babel({
      babelHelpers: "runtime",
      exclude: "node_modules/**", // 只编译我们的源代码
    }),
  ],
};
