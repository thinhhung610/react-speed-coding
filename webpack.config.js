const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PostcssImport = require('postcss-easy-import');

const APP = __dirname + '/app';
const BUILD = __dirname + '/build';
const STYLE = __dirname + '/app/styles/style.css';
const TEMPLATE = __dirname + '/app/templates/index_default.html';

module.exports = {
	entry: {
		app: APP,
		style: STYLE
	},
	output: {
		path: BUILD,
		filename: '[name].js'
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loaders: ['babel?cacheDirectory'],
				include: APP
			},
			{
				test: /\.css$/,
				loaders: ['style', 'css'],
				include: APP
			}
		]
	},
	devtool: 'eval-source-map',
	devServer: {
		historyApiFallback: true,
		hot: true,
		inline: true,
		progress: true,
		stats: 'errors-only',
		host: process.env.HOST,
		post: process.env.PORT
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: TEMPLATE,
			inject: 'body' // add script into the end of the body tag
		}),
		new webpack.HotModuleReplacementPlugin()
	],
	postcss: function() {
		return [
			PostcssImport({
				addDependencyTo: webpack,
				prefix: '_'
			})
			//prescss,
			//autoprefixer({ browser: ['last two versions'] })
		]
	}
};
