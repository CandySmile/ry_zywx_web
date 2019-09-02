
import { Local, Cookie } from '../../utils/storage'
import axios from '../../../src/utils/fetch'
import axios1 from 'axios'
import Vue from 'vue'

const periodDetail = {
	state: {
		detailData: {
			content: '',
			operationTimes: '',
			workRequest: '',
			fileName: ''
		},
		workList: [],
		auth: false,
		periodId: Cookie.get("periodId") ? Cookie.get("periodId") : ''

	},
	actions: {
		setPeriodId({
			commit,
			state
		}, params) {
			commit("SETPERIODID", params);
		},
		delWork({
			commit,
			state
		}, params) {
			return new Promise((resolve, reject) => {
				axios.get('delWork', params)
					.then(res => {
						//console.log("delWork" + JSON.stringify(res))
						state.newsLoading = false;
						commit('DELWORK', res)
						resolve(res)
					}).catch(err => {
						reject(err)
					})
			})
		},
		getPeriodDetail({
			commit,
			state
		}, params) {
			return new Promise((resolve, reject) => {
				axios.get('periodDetail', params)
					.then(res => {
						//console.log("getPeriodDetail" + JSON.stringify(res))
						state.newsLoading = false;
						commit('GETPERIODDETAIL', res)
						resolve(res)
					}).catch(err => {
						reject(err)
					})
			})
		},

		uploadFiles({
			commit,
			state
		}, params) {
			return new Promise((resolve, reject) => {
				let config = {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				}  
				axios1.post('http://192.168.241.41:8080/njzy/mobile/sys/file/d2220de938734a46b9c7699ae1c9997e/uploadFile', params.formData, config).then(function(res) {
					if(res.status === 2000) {
						/*这里做处理*/
					}
				})     
				//				axios.postFile('', params)
				//					.then(res => {
				//						console.log("uploadFile" + JSON.stringify(res))
				//						state.newsLoading = false;
				//						commit('GETPERIODDETAIL', res)
				//						resolve(res)
				//					}).catch(err => {
				//						reject(err)
				//					})
			})
		},
	},
	mutations: {
		GETPERIODDETAIL(state, data) {
			state.detailData = Object.assign({}, data.coursePeriod);
			state.workList = data.workList || [];
			state.auth = data.flag;

		},
		SETPERIODID(state, data) {
			state.periodId = data.id;
			Cookie.set({
				periodId: data.id
			});
		},
		DELWORK(state, data) {
		
		},

	}
}
export default periodDetail