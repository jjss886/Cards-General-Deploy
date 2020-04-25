const { resolve } = require("path");
const isDev = process.env.NODE_ENV === "development";

module.exports = {
  entry: ["babel-polyfill", "./client/index.js"],
  mode: isDev ? "development" : "production",
  output: {
    filename: "bundle.js",
    path: resolve(__dirname, "public"),
  },
  devtool: "source-map",
  context: __dirname,
  watchOptions: {
    ignored: /node_modules/,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: resolve(__dirname, "./client"),
        loader: "babel-loader",
      },
      {
        test: /\.(png|jpg|svg)$/,
        use: ["file-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  node: {
    fs: "empty",
  },
};
