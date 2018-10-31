const path = require('path');

const publicFolder = path.resolve(__dirname, 'public');
const entry = path.resolve(__dirname, 'dev/index.jsx');

module.exports = {
  entry,
  output: {
    path: publicFolder,
    filename: 'bundle.js',
  },
  module: {
    rules: [{ test: /\.js?x/, exclude: /node_modules/, use: 'babel-loader' }],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
