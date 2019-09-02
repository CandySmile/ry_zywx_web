
import { Local } from '../../utils/storage'
import axios from '../../../src/utils/fetch'
import Vue from 'vue'

const statistic = {
	state: {
		year: '',
		term: '',
		staCourseId: '',
		courseList: [],
		staDataList: [],
		staPageNo:1,
		staPageSize:9,
		staPageTotal:0
		

	},
	actions: {
		getStaticticList({
			commit,
			state
		}, params) {
			return new Promise((resolve, reject) => {
				axios.get('getStaticticList', params)
					.then(res => {
						//console.log("getStaticticList" + JSON.stringify(res))
						state.newsLoading = false;
						commit('SETDATALIST', res)
						resolve(res)
					}).catch(err => {
						reject(err)
					})
			})
		},
		getCourseCondition({
			commit,
			state
		}, params) {
			return new Promise((resolve, reject) => {
				axios.get('getCourseCondition', params)
					.then(res => {
						//console.log("getCourseCondition" + JSON.stringify(res));
						resolve(res);
												commit("SETCOURSEINFO", res.periodsList||[]);
					}).catch(err => {
						reject(err)
					})
			})
		},

		getStaCondition({
			commit,
			state
		}, params) {
			return new Promise((resolve, reject) => {
				axios.get('getStaCondition', params)
					.then(res => {
						//console.log("getStaCondition" + JSON.stringify(res))
												commit("SETBASEINFO", res);
						resolve(res);
					 
					}).catch(err => {
						reject(err)
					})
			})
		}

	},
	mutations: {
      SETBASEINFO(state,data){
      	if(data.year){
      		state.year = data.year;
      	}
      	if(data.term){
      		state.term = data.term;
      	}
      },
      SETCOURSEINFO(state,data){
      	if(data&&data.length){
      	state.courseList = data;
      	state.staCourseId = '';
      	}else{
      		state.courseList=[];
      		state.staCourseId="";
      	}
      },
      SETDATALIST(state,data){
      	//console.log("SETDATALIST");
      	state.staDataList=(data.page||{}).rows||[];
      	state.staPageTotal = (data.page||{}).records||0;
      	
      }
	}
}
export default statistic