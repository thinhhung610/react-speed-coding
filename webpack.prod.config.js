const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const PostcssImport = require('postcss-import');
const precss = require('precss');
const autoprefixer = require('autoprefixer');

const APP = __dirname + '/app';
const BUILD = __dirname + '/build';
const STYLE = __dirname + '/app/styles/style.css';
const PUBLIC = __dirname + '/app/public';
const TEMPLATE = __dirname + '/app/templates/index_default.html';

const PACKAGE = Object.keys(
  require('./package.json').dependencies
);

module.exports = {
  entry: {
    app: APP,
    style: STYLE,
    vendor: PACKAGE
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: BUILD,
    filename: '[name].[chunkhash].js',
    chunkFilename: '[chunkhash].js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel?cacheDirectory'],
        include: APP
      },
      // Extract CSS during build
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss'),
        include: APP
      }
    ]
  },
  plugins: [
    new CleanPlugin([BUILD]),
    new HtmlWebpackPlugin({
      template: TEMPLATE,
      inject: 'body',
      // Use html-minifier
      minify: {
        collapseWhitespace: true
      }
    }),
    new ExtractTextPlugin('[name].[chunkhash].css'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    // Copy the files from ./app/public to ./build
    new CopyWebpackPlugin(
      [
        { from: PUBLIC, to: BUILD }
      ],
      {
        ignore: [
          '.DS_Store'
        ]
      }
    )
  ],
	postcss: function() {
		return [
      PostcssImport({
				addDependencyTo: webpack
			}),
      autoprefixer,
			precss
		]
	}
};
