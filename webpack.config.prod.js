const webpack = require('webpack');

const plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      screw_ie8: true,
      conditionals: true,
      unused: true,
      comparisons: true,
      sequences: true,
      dead_code: true,
      evaluate: true,
      if_return: true,
      join_vars: true,
    },
    output: {
      comments: false,
    },
  }),
  new webpack.optimize.ModuleConcatenationPlugin(),
];

module.exports = {
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    './src/index.js',
  ],
  output: {
    path: `${__dirname}/public/js`,
    publicPath: '/js', // relative to contentBase
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        exclude: /node_modules/,
        query: {
          configFile: './.eslintrc',
        },
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      { test: /\.csv$/, loader: 'dsv-loader' },
    ],
  },
  devtool: 'source-map',
  plugins,
  devServer: {
    hot: true,
    historyApiFallback: true,
    contentBase: './public',
  },
};
