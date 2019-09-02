
import { Local,Cookie } from '../../utils/storage'
import axios from '../../../src/utils/fetch'
import Vue from 'vue'

const period = {
	state: {
		courseId: Cookie.get('courseId') ? Cookie.get('courseId') : '',
		periodListData: [],
		stateMap: [{
			val: "1",
			text: "已开始"
		}, {
			val: "2",
			text: "未开始"
		}],
		status: '',
		periodPageNo: 1,
		periodPageSize: 10,
		periodPageTotal: 0,

	},
	actions: {

				setCourseId({
			commit,
			state
		}, params){
			commit("SETCOURSEID",params);
		},
		getPeriodList({
			commit,
			state
		}, params) {
			return new Promise((resolve, reject) => {
				axios.get('periodList', params)
					.then(res => {
						//console.log("getPeriodList" + JSON.stringify(res))
						state.newsLoading = false;
						commit('GETPERIODLIST', res)
						resolve(res)
					}).catch(err => {
						reject(err)
					})
			})
		},

	},
	mutations: {
			SETCOURSEID(state,data){
			state.courseId = data.id;
			Cookie.set({courseId:data.id});
		},

		GETPERIODLIST(state, data) {
			state.periodListData = (data.page || {}).rows || [];
			state.periodPageTotal = data.page.records;
			//console.log("periodPageTotal" + state.periodPageTotal);
			//console.log("periodListData" + JSON.stringify(state.periodListData));
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
export default period