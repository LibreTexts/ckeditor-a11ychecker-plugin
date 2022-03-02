const Path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Webpack = require('webpack');

module.exports = {
  mode: 'production',
  stats: 'errors-only',
  bail: true,
  entry: {
    a11yPlugin: Path.resolve(__dirname, '../src/scripts/registerA11yPluginLibretexts.js'),
  },
  output: {
    filename: '[name].min.js',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
  resolve: {
    alias: {
      '~': Path.resolve(__dirname, '../src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.s?css/i,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
};
