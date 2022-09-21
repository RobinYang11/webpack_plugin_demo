
import {
	SyncHook
} from 'tapable'

class MyWebpack {

}

const webpack = new MyWebpack();


class Compilation {

	compiler: Compiler;
	hooks: {
		
	}

	constructor(compiler, params) {
		this.compiler = compiler;

	}
}

class Compiler {
	hooks = {
		compilation: new SyncHook(['args'], 'compilation'),
	}
}

const compiler = new Compiler();
compiler.hooks.compilation.tap("test", (args: any) => {
	console.log("##", args)
})

const compilation = new Compilation(compiler, {})

