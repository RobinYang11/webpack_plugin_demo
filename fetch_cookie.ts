import fetch from 'node-fetch';
// import request from 'request';
const request = require('request')

// fetch('http://dev.panzitech.com:3001').then(res => {
// 	console.log(res.headers)
// })
// 	.catch(err => {
// 		console.log(err)
// 	})

request('http://dev.panzitech.com:3001', (a:any, b:any, c:any) => {
	console.log(b);
})