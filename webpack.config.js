const path = require('path');
const public = path.resolve(__dirname, 'public');
const entry = path.resolve(__dirname, 'dev/index.jsx');

module.exports = {
  entry,
  output: {
    path: public,
    filename: 'bundle.js'
  },
  module: {
    rules: [{test: /\.js?x/, exclude: /node_modules/, use: 'babel-loader'}]
  }
}