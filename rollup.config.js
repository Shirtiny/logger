import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import filesize from "rollup-plugin-filesize";
import commonjs from "@rollup/plugin-commonjs";
import { uglify } from "rollup-plugin-uglify";

// rollup.config.js
export default {
  input: "src/index.js",
  output: {
    dir: "dist",
    // file: "index.js",
    format: "umd",
    indent: false,
    name: "ShLog",
  },
  plugins: [
    resolve(),
    commonjs(),
    filesize(),
    uglify(),
    babel({
      babelHelpers: "runtime",
      exclude: "node_modules/**", // 只编译我们的源代码
    }),
  ],
};
