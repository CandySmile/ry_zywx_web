
import { Local,Cookie } from '../../utils/storage'
import axios from '../../../src/utils/fetch'
import Vue from 'vue'
import {IMAGE_GET_CONFIG_OSS} from '../../config/networkApi'
const home = {
	state: {
		newsList: [],
		totalData: {

		},
		gradeFilter: [],
		typeFilter: [],
		newsIndex: 0,
		newsPrevIndex: 0,
		newsLoading: false,
		end: false,
		grade: '',
		type: '',
		homePageNo: 1,
		homePageSize: 9,
		pageTotal: 0,
		picHost:IMAGE_GET_CONFIG_OSS

	},
	actions: {

		delHomeTag({
			commit
		}, news) {
			commit('DELHOMETAG', news)
		},

		getHomeList({
			commit,
			state
		}, params) {
			return new Promise((resolve, reject) => {
				axios.get('homeList', params)
					.then(res => {
						//console.log("getHomeList" + JSON.stringify(res))
						state.newsLoading = false;
						commit('GETHOMELIST', res)
						resolve(res)
					}).catch(err => {
						reject(err)
					})
			})
		},
        
		getHomeTotal({
			commit,
			state
		}, params) {
			return new Promise((resolve, reject) => {
				axios.get('homeIndex', params)
					.then(res => {
						//console.log("getHomeTotal" + JSON.stringify(res))
						commit("SETTOTALINFO", res);
						resolve(res)
					}).catch(err => {
						//console.log("getHomeTotal"+JSON.stringify(err));
						reject(err)
					})
			})
		}

	},
	mutations: {
	

		GETHOMELIST(state, data) {
			state.newsList = (data.page||{}).rows||[];
			state.pageTotal = data.page.records;
			//console.log("newList" + JSON.stringify(state.newsList));
			//			Vue.prototype.$set(state.newsList, state.newsIndex,list)
		},
		GRADECHAGE(state, val) {
			state.grade = val
		},
		TYPECHANGE(state, val) {
			state.type = val
		},
		SETTOTALINFO(state, obj) {
			state.totalData = obj;
			state.gradeFilter = obj.gradeList;
			state.typeFilter = obj.CourseTypeList;
		}
	}
}
export default home