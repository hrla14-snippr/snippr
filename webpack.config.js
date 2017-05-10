const path = require('path');

const DEV = path.join(__dirname, '/client');
const OUTPUT = path.join(__dirname, '/public');

module.exports = {
  entry: `${DEV}/index.jsx`,
  output: {
    path: OUTPUT,
    filename: 'bundle.js',
  },
  watch: true,
  module: {
    loaders: [{
      loader: 'babel-loader',
      include: DEV,
      query: {
        presets: ['es2015', 'react'],
      },
    }],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: 'inline-source-map',
};
