
import { Local } from '../../utils/storage'
import axios from '../../../src/utils/fetch'
import Vue from 'vue'

const creation = {
	state: {
      creationList:[],
      creationPageNo:1,
      creationPageSize:12,
      creationPageTotal:0
      

	},
	actions: {
		addHomeTag({
			commit
		}, news) {
			commit('ADDHOMETAG', news)
		},
		delHomeTag({
			commit
		}, news) {
			commit('DELHOMETAG', news)
		},

		getCreationList({
			commit,
			state
		}, params) {
			return new Promise((resolve, reject) => {
				axios.get('getCreationList', params)
					.then(res => {
						//console.log("getCreationList" + JSON.stringify(res))
						state.newsLoading = false;
						commit('GETCREATIONLIST', res)
						resolve(res)
					}).catch(err => {
						reject(err)
					})
			})
		}

	},
	mutations: { 
		GETCREATIONLIST(state, data) {
			state.creationList = (data.page||{}).rows||[];
			state.creationPageTotal = data.page.records;
			//console.log("creationList" + JSON.stringify(state.creationList));
			//			Vue.prototype.$set(state.newsList, state.newsIndex,list)
		},

	}
}
export default creation