import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import home from './modules/home'
import period from './modules/period'
import periodDetail from './modules/periodDetail'
import workInfo from './modules/workInfo'
import creation from './modules/creation'
import statistic from './modules/statistic'


import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        app,
        user,
        home,
        period,
        periodDetail,
        workInfo,
        creation,
        statistic,
    },
    getters
})

export default store