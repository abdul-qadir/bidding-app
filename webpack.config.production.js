const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const config = require('config');

module.exports = {
  devtool: 'source-map',
  entry: [
    path.join(__dirname, 'src/main.jsx'),
  ],
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name].js',
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.tpl.html',
      inject: 'body',
      filename: 'index.html',
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(config.NODE_ENV),
      __DEV__: JSON.stringify(config.NODE_ENV),
      AUTH0_CALLBACK_URL: JSON.stringify(config.AUTH0_CALLBACK_URL),
      AUTH0_CLIENT_SECRET: JSON.stringify(config.AUTH0_CLIENT_SECRET),
      AUTH0_CLIENT_ID: JSON.stringify(config.AUTH0_CLIENT_ID),
      AUTH0_DOMAIN: JSON.stringify(config.AUTH0_DOMAIN),
      AUTH_DOMAIN: JSON.stringify(config.AUTH_DOMAIN),
    }),
    new ExtractTextPlugin('css/[name]-[hash].min.css'),
  ],
  eslint: {
    configFile: path.join(__dirname, '.eslintrc'),
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.json?$/,
        loader: 'json',
      },
      {
        test: /\.xml$/,
        loader: 'xml-loader',
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules&localIdentName=[name]---[local]---[hash:base64:5]!postcss'),
        exclude: [
          /bootstrap.css/,
        ],
      },
      { test: /bootstrap.css/, loader: 'ignore-loader' },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!sass'),
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        loader: 'file',
        query: {
          name: 'static/images/[name].[ext]',
        },
      },
    ],
  },
  _hotPort: 8000,
  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.css', '.scss'],
  },
  postcss: () => (
    [
      autoprefixer({
        browsers: [
          '>1%',
          'last 4 versions',
          'Firefox ESR',
          'not ie < 9',
        ],
      }),
    ]
  ),
};
