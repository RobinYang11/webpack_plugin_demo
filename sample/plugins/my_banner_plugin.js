
const { ConcatSource } = require('webpack-sources')
const webpack = require('webpack');
class AbcPlugin {

	constructor(options) {
		this.options = options;
	}

	apply(compiler) {
		const options = this.options;

		const cache = new WeakMap();
		compiler.hooks.compilation.tap("MyBannerPlugin", compilation => {
			compilation.hooks.processAssets.tap({
				name: "MyBannerPlugin",
				state: webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONS
			}, (assets) => {

				for (const chunk of compilation.chunks) {
					for (const file of chunk.files) {

						const comment = "console.log('POWERED BY ROBIN!')"
						

						// comilation.updateAsset 更新 资源文件
						compilation.updateAsset(file, old => {
							// console.log("###old", old._source.getChildren())
							let cached = cache.get(old);

							if (!cached || cached.comment !== comment) {
								const source = options.footer
									? new ConcatSource(old, "\n", comment)
									: new ConcatSource(comment, "\n", old);
								cache.set(old, { source, comment });
								return source;
							}
							return cached.source;
						});

					}
				}
			})
		})
	}
}


module.exports = AbcPlugin;





