const webpack = require('webpack');

const plugins = [
  new webpack.DefinePlugin({
    NODE_ENV: JSON.stringify('production'),
  }),
  new webpack.LoaderOptionsPlugin({
    options: {
      eslint: {
        failOnError: false,
        failOnWarning: false,
      },
    },
  }),
  new webpack.HotModuleReplacementPlugin(), // Enable HMR
];

module.exports = {
  entry: [
    '@babel/polyfill',
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
  devtool: 'cheap-module-eval-source-map',
  plugins,
  devServer: {
    hot: true,
    historyApiFallback: true,
    contentBase: './public',
  },
};
