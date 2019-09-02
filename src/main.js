import Vue from 'vue'
import App from './App.vue'
import router from './router/permission.js'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Promise from 'es6-promise'
Promise.polyfill();
Vue.use(ElementUI)
/*样式*/
import './styles/index.css'
import './styles/index.less'

/*工具类*/
import './utils/iconfont.js'
import './utils/rem.js'



import { Cookie } from '../src/utils/storage'
Vue.prototype.Cookie = Cookie

// 返回
Vue.prototype.back = (route) => {
    route.animate = 2
    history.go(-1)
}


// 全局组件
import customComponents from './custom-components.js'
Vue.use(customComponents)

// swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css' 
Vue.use(VueAwesomeSwiper)


import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
Vue.use(Viewer)
Viewer.setDefaults({
  Options: {  'button': true,  'title': true,  'tooltip': true, 'movable': true, 'zoomable': true, 'rotatable': true, 'scalable': true, 'transition': true, 'fullscreen': true, 'keyboard': true, 'url': 'data-source' }
})

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})