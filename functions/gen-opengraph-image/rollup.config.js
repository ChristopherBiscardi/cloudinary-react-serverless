// const rollup = require("rollup");
const React = require("react");
const ReactDOM = require("react-dom");
const commonjs = require("rollup-plugin-commonjs");
const resolve = require("rollup-plugin-node-resolve");
const replace = require("rollup-plugin-replace");
const builtins = require("rollup-plugin-node-builtins");
const globals = require("rollup-plugin-node-globals");
const babel = require("rollup-plugin-babel");
const image = require("@rollup/plugin-image");

module.exports = {
  input: require.resolve("./variations/chris-opengraph-image.js"),
  output: {
    file: "dist/bundle-a.js",
    format: "iife"
  },
  plugins: [
    resolve(),
    babel({
      presets: ["@babel/preset-react"],
      plugins: ["babel-plugin-preval"],
      runtimeHelpers: true
    }),
    commonjs({
      namedExports: {
        "react-dom": Object.keys(ReactDOM),
        react: Object.keys(React)
      }
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    builtins(),
    globals(),
    image()
  ]
};
