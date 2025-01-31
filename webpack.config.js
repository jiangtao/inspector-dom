const path = require('path')

module.exports = {
  mode: 'production',
  entry: {
    index: './src/index.js'
  },
  output: {
    path: path.join(__dirname, 'docs'),
    chunkFilename: '[name].js'
  }
}
