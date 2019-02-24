const webpack = require('webpack');

const plugins = [
  new webpack.optimize.ModuleConcatenationPlugin(),
];

module.exports = {
  mode: 'production',
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
      {
        test: /\.csv$/,
        loader: 'dsv-loader',
      },
      {
        test: /config\.json$/,
        loader: 'special-loader',
        type: 'javascript/auto',
      },
    ],
  },
  devtool: 'source-map',
  plugins,
};
