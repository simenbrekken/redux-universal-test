const path = require('path');
const webpack = require('webpack');

const env = process.env.NODE_ENV;
const port = +(process.env.PORT || 3000) + 1;

const config = {
  entry: './src/client',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(env),
        API_URL: JSON.stringify('/api'),
      },
    }),
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      include: path.join(__dirname, 'src'),
    }],
  },
  resolve: {
    extensions: ['', '.js'],
  },
};

const development = Object.assign({}, config, {
  devtool: 'inline-source-map',
  entry: ['webpack-hot-middleware/client'].concat(config.entry),
  output: Object.assign({}, config.output, {
    publicPath: `http://localhost:${port}/`,
  }),
  plugins: config.plugins.concat(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ),
});

const production = Object.assign({}, config, {
  devtool: 'hidden-source-map',
  output: Object.assign({}, config.output, {
    publicPath: '/',
  }),
  plugins: config.plugins.concat(
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compress: {
        warnings: false,
        drop_console: true,
        screw_ie8: true,
      },
    })
  ),
});

module.exports = env === 'production' ? production : development;
