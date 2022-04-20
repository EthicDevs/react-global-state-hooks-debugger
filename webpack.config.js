//webpack.config.js
const path = require("path");

const mode =
  process.env.NODE_ENV !== "production" ? "development" : "production";

module.exports = {
  mode,
  devtool: "inline-source-map",
  entry: {
    main: "./debugger-ui/debugger-ui.ts",
  },
  output: {
    path: path.resolve(__dirname, "./public"),
    filename: "debugger-ui.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
      },
    ],
  },
};
