const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const config = require('config');

module.exports = {
  bail: true,
  devtool: 'source-map',
  entry: [
    path.join(__dirname, 'src/main.jsx'),
  ],
  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: '/',
    filename: '[name]-[hash].min.js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.css', '.scss'],
  },
  module: {
    preLoaders: [
      // {
      //   test: /\.(js|jsx)$/,
      //   loader: 'eslint',
      //   include: path.join(__dirname, 'src'),
      // }
    ],
    loaders: [
      {
        test: /\.(js|jsx)$/,
        include: path.join(__dirname, 'src'),
        loader: 'babel-loader',
      },
      {
        test: /\.json?$/,
        loader: 'json',
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules&localIdentName=[name]---[local]---[hash:base64:5]!postcss'),
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!sass'),
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        loader: 'file',
        query: {
          name: 'images/[name].[ext]',
        },
      },
    ],
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
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.tpl.html',
      inject: 'body',
      filename: 'index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(config.NODE_ENV),
      __DEV__: JSON.stringify(config.NODE_ENV),
      AUTH0_CALLBACK_URL: JSON.stringify(config.AUTH0_CALLBACK_URL),
      AUTH0_CLIENT_SECRET: JSON.stringify(config.AUTH0_CLIENT_SECRET),
      AUTH0_CLIENT_ID: JSON.stringify(config.AUTH0_CLIENT_ID),
      AUTH0_DOMAIN: JSON.stringify(config.AUTH0_DOMAIN),
      AUTH_DOMAIN: JSON.stringify(config.AUTH_DOMAIN),
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false,
      },
      mangle: {
        screw_ie8: true,
      },
      output: {
        comments: false,
        screw_ie8: true,
      },
    }),
    new ExtractTextPlugin('css/[name]-[hash].min.css'),
  ],
};
