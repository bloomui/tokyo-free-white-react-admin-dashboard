const webpack = require('webpack');

module.exports = {
  webpack: {
    configure: {
      resolve: {
        fallback: {
          zlib: require.resolve('browserify-zlib'),
          stream: require.resolve('stream-browserify'),
          util: require.resolve('util'),
          buffer: require.resolve('buffer'),
          asset: require.resolve('assert'),
          crypto: require.resolve('crypto-browserify'),
          timers: require.resolve("timers-browserify"),
          fs: false
        }
      },
      node: {
        // fs: 'empty'
        global: true,
        __filename: true,
        __dirname: true,
      },
      plugins: [
        new webpack.ProvidePlugin({
          process: 'process/browser',
          Buffer: ['buffer', 'Buffer']
        })
      ]
    }
  }
};
