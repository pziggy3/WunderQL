const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
  target: 'web', // Our app can run without electron
  entry: ['./src/index.jsx'],
  output: {
    path: path.resolve(__dirname, 'dist'), // Where all the output files get dropped after webpack is done with them
    filename: 'bundle.js' // The name of the webpack bundle that's generated
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.jsx?$/,
        use: [{ loader: 'babel-loader', options: { compact: false } }],
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [{ loader: 'file-loader?name=img/[name]__[hash:base64:5].[ext]' }],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [
          { loader: 'file-loader?name=font/[name]__[hash:base64:5].[ext]' },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ title: 'WunderQL' }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'bundle.css',
      chunkFilename: '[id].css',
    }),
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify('production'),
    // }),
    new webpack.ProvidePlugin({
      'React': 'react',
    }),
  ],
  stats: {
    colors: true,
    children: false,
    chunks: false,
    modules: false,
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  }

};