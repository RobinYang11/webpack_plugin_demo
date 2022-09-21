
import {
	SyncHook
} from 'tapable'

const hook = new SyncHook(["arg1"], '同步钩子');

// 为hook 添加的call,tap 拦截
hook.intercept({
	call: (args: any) => {
		console.log("call 拦截!")
	},
	tap:(args:any)=>{
		console.log("为hook注册事件时执行!")
	}
})

hook.tap("注册事件1", (args: any) => {
	console.log("注册事件1:  " + args)
	args.forEach((_: any, index: number) => {
		args[index] *= 10;
	})
})

hook.tap("注册事件2", (args) => {
	console.log("注册事件2:  " + args)
})

hook.tap("日志插件", (args) => {
	console.log("日志插件:  ", Date.now(), args)
})
// hook 名称
console.log(hook.name)
// hook 中注册的所有事件
console.log(hook.taps)

const sharedArr = [1, 2]
// 调用hook
hook.call(sharedArr)


