const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: "./src/index.js",
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: "xm-select.js"
	},
	module: {
		rules: [{
			test: /\.css$/,
			use: 'css-loader'
		}, {
			test: /\.less$/,
			exclude: /node_modules/,
			loader: 'style-loader!css-loader!less-loader'
		}, {
			test: /\.m?js$/,
			exclude: /(node_modules|bower_components)/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env']
				}
			}
		}]
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, "src"),
			'components': path.resolve(__dirname, "src/components"),
			'style': path.resolve(__dirname, "src/style"),
		}
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.ejs',
			minify: {
				collapseWhitespace: true
			}
		}),
	],
	devServer: {
		contentBase: path.join(__dirname, "./dist"),
		compress: true,
		host: '0.0.0.0',
		port: 9000,
		open: true,
		hot: true,
	}
};
