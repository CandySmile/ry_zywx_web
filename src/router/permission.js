import store from '../store'
import Vue from 'vue'
import { router } from './index'

router.beforeEach((to, from, next) => {
	//console.log("123");
    if (to.meta.login) { //判断前往的界面是否需要登陆
        if (store.state.user.user.name) { // 是否已经登陆
            next()
        }
    }else{
        if (to.meta.page) store.state.app.pageLoading = true
        next() 
    }
    
})

router.afterEach((to, from) => {
    if (to.meta.page) store.state.app.pageLoading = false
    document.title = to.name
})

export default router
