
import { Local } from '../../utils/storage'
import axios from '../../../src/utils/fetch'
import Vue from 'vue'

const defaultData = {
	workTitle: '',
	content: '',
	pictureId: '',
	videoId: '',
	id: '',
	fileId: '',
	fileName: '',
	fileSrc: '',
	videoSrc: ''
};
const workInfo = {
	state: {
		workInfo: (()=>{
			return Object.assign({},defaultData);
		})()
	},
	actions: {
		workSave({
			commit,
			state
		}, params) {
			return new Promise((resolve, reject) => {
				axios.post('workSave', params)
					.then(res => {
						//console.log("workSave" + JSON.stringify(res))
						state.newsLoading = false;
						//						commit('GETPERIODDETAIL', res)
						resolve(res)
					}).catch(err => {
						reject(err)
					})
			})
		},
		clearAll({
			commit,
			state
		}, params) {
			commit("CLEARALL",defaultData);
		},
		delItem({
			commit,
			state
		}, params) {
			commit('DELITEM', params)

		},
		getWorkDetail({
			commit,
			state
		}, params) {
			return new Promise((resolve, reject) => {
				axios.get('getWorkDetail', params)
					.then(res => {
						//console.log("getWorkDetail" + JSON.stringify(res))
						state.newsLoading = false;
						commit('SETWORKINFO', res)
						resolve(res)
					}).catch(err => {
						reject(err)
					})
			})
		},
		getFile({
			commit,
			state
		}, params) {
			return new Promise((resolve, reject) => {
				axios.getFile('', params)
					.then(res => {
						//console.log("getFile" + JSON.stringify(res))
						state.newsLoading = false;
						if(params.domain) {
							commit("SETFILEINFO", {
								params: params,
								data: res.data
							})
						}
						resolve(res)
					}).catch(err => {
						reject(err)
					})
			})
		},
		uploadFile({
			commit,
			state
		}, params) {
			return new Promise((resolve, reject) => {
				let config = {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				}  
				axios.uploadFile('', params.formData, config).then(function(res) {
					if(res.data.data) {
						//console.log("uploadFile");
						commit('SET' + params.domain.toUpperCase(), res.data.data)
					} 
					resolve(res);

				})  .catch(err => {
					reject(err)
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
		SETFILEID(state, data) {
			state.workInfo.fileId = data[0];

		},
		SETPICTUREID(state, data) {
			state.workInfo.pictureId = state.workInfo.pictureId ? state.workInfo.pictureId.split(",").concat(data).join(",") : data[0]
		},
		SETVIDEOID(state, data) {
			state.workInfo.videoId = data[0];
		},
		SETWORKINFO(state, data) {
			//console.log("setWORKINFO" + JSON.stringify(data));
			state.workInfo = Object.assign({}, data.workView);
		},
		SETFILEINFO(state, data) {
			state.workInfo[data.params.domain] = "http://" + data.data.data.filePath;
			state.workInfo = Object.assign({}, state.workInfo);
			//console.log("state.workInfo[data.params.domain]" + state.workInfo[data.params.domain]);
		},
		CLEARALL(state, data) {
          state.workInfo = Object.assign({},data);
		},
		DELITEM(state, data) {
			//console.log("dataDELITEM" + JSON.stringify(data));
			if(data.domain != "pictureId") {
				state.workInfo[data.domain] = '';
				state.workInfo[data.refedDomain] = '';
			} else {
				let temp = state.workInfo[data.domain] ? state.workInfo[data.domain].split(",") : [];
				if(temp.length) {
					temp.splice(data.index, 1);
				}

				state.workInfo[data.domain] = temp ? temp.join(",") : ''
			}
		}
	}
}
export default workInfo