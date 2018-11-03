const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const publicFolder = path.resolve(__dirname, "public");
const entry = path.resolve(__dirname, "dev/index.jsx");

module.exports = {
  entry,
  output: {
    path: publicFolder,
    filename: "bundle.js"
  },
  module: {
    rules: [
      { test: /\.js?x/, exclude: /node_modules/, use: "babel-loader" },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          "file-loader",
          {
            loader: "image-webpack-loader",
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true // webpack@2.x and newer
            }
          }
        ]
      }
    ]
  },
  plugins: [new MiniCssExtractPlugin({ filename: "styles.css" })],
  resolve: {
    extensions: [".js", ".jsx"]
  }
};
