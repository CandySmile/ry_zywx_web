import axios from 'axios'
import qs from 'qs'
import Vue from 'vue'
import { Local,Cookie } from '../utils/storage'
import API_CONFIG, {
	HOST,
	FILE_UPLOAD_CONFIG_OSS,
	IMAGE_GET_CONFIG_OSS,
	FILE_GET_CONFIG_OSS
} from '../config/networkApi';

axios.defaults.withCredentials = true
//axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
//axios.defaults.transformRequest = [obj => qs.stringify(obj)]

var instance = axios.create({
	baseURL: HOST,
	timeout: 1000,
	withCredentials: true,
	headers: {
		'Content-Type': 'multipart/form-data'
	}
});
instance.defaults.withCredentials = true
Vue.prototype.instance = instance;
//axios.defaults.transformRequest =[(data,config)=>{
//	if(!config['Content-Type']) return qs.stringify(data);
//	switch(config['Content-Type'].toLowerCase()){
//		case 'application/json;charset=utf-8':{
//			return JSON.stringify(data)
//		}
//		case 'multipart/form-data;charset=utf-8':{
//			return data;
//		}
//		default:{
//			return qs.stringify(data)
//		}
//	}
//}]

// 发送时
//axios.interceptors.request.use(config => {
//	// 开始
//	return config
//}, err => {
//	return Promise.reject(err)
//})
//
//// 响应时
//axios.interceptors.response.use(response => response, err => Promise.resolve(err.response))

// 检查状态码
function checkStatus(res) {
	// 结束
	if(res.status === 200 || res.status === 304) {
//		this.$route.go(0);
		return res.data
	}
	if(res.status === 599) {
		//console.log("599");
		Cookie.remove(['username', 'avatar','token']);
		window.location.reload();
//		this.$route.go(0)
		
	}
	return {
		code: 0,
		msg: res.data.msg || res.statusText,
		data: res.statusText
	}
	return res
}

// 检查CODE值
function checkCode(res) {
	if(res.code === 0) {
		throw new Error(res.msg);
		
	}

	return res
}

const baseURL = HOST;
export default {
	get(url, params) {
		if(!url) return
		return axios({
			method: 'get',
			url: API_CONFIG[url],
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				token: params.token || ''
			},
			params,
			timeout: 30000000,
			cache:false,
		}).then(checkStatus).then(checkCode)
	},
	post(url, data) {
		if(!url) return
		let headers = {
			'Content-Type': 'application/x-www-form-urlencoded'
		};
		if(data.token) {
			headers.token = data.token;
		}
		return axios({
			method: 'post',
			url: API_CONFIG[url],
			data: qs.stringify(data),
			headers: headers,
			timeout: 30000000,
			cache:false,
		}).then(checkStatus).then(checkCode)
	},
	uploadFile(url, params) {
        url= url||FILE_UPLOAD_CONFIG_OSS;
		let config = {
			headers: {
				'Content-Type': 'multipart/form-data'
			},
			cache:false,
			processData:false,
			cache:false,
			timeout: 30000000,
		}
		return axios.post(url, params, config)
	},
	getFile(url, params) {
        url=url||(FILE_GET_CONFIG_OSS+params.id);
		return axios.get(url, params)
	}
}