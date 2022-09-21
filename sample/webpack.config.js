
const path = require('path');
const MyBannerPlugin = require('./plugins/my_banner_plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const JSDOM = require("jsdom").JSDOM;

module.exports = {
	entry: {
		"index": "./sample/index.js"
	},
	mode: "production",
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	devServer: {
		port: 8000,
		host: "dev.panzitech.com",
		setupMiddlewares: (middlewares, server) => {
			inject_user_middleware(server.app);
			return middlewares;
		}
	},
	plugins: [
		new MyBannerPlugin({ name: "MyBannerPlugin", footer: " const a = '**POWERED BY ROBIN**'" }),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			inject: true,
			template: path.resolve("./sample/template.html")
		})
	]
}

function inject_user_middleware(app) {
	app.use((req, res, next) => {
		if (req.url.indexOf('html') >= 0) {
			var options = {
				root: path.join(__dirname, 'dist'),
				dotfiles: 'deny',
				headers: {
					'x-timestamp': Date.now(),
					'x-sent': true
				}
			}
			res.sendFile("index.html", options, function (err) {
				if (err) {
					next(err)
				} else { }
			})
		}
		next()
	})
}