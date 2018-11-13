
module.exports = {
  entry: './src/server.js',
  output: {
    filename: 'bundle.js'
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  externals: {
    'node-hid': 'commonjs node-hid',
    'usb': 'commonjs usb'
  },
  module: {
    rules: [
      {
        test: /\.(graphql|gql)$/,
        loader: 'graphql-tag/loader',
        exclude: /node_modules/
      }
    ]
  }
}
