import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
Router.prototype.animate = 0
const _import_ = file => () => import('../views/' + file + '.vue')
import Login from '@/components/Login/index';


/*
    slide: 页面切换动画
    login: 是否需要登陆

 */
export const constantRouterMap = [
    
    { 
        path: '/', 
        name: '首页', 
         meta: { 
            slide: 1 ,
            login: true
        },
        redirect:"/home",
        component: _import_('Layout/index'),
        children: [
            { path: 'home', component: _import_('Home/index'), name: '首页' }
        ]
    },
    { 
        path: '/period', 
        name: '课时列表', 
         meta: { 
            slide: 1 ,
            login: true
        },
        component: _import_('Layout/index'),
        children: [
            { path: '/', component: _import_('Period/list'), name: '课时列表' }
        ]
    },
    { 
        path: '/periodDetail', 
        name: '课时详情', 
         meta: { 
            slide: 1 ,
            login: true
        },
        component: _import_('Layout/index'),
        children: [
            { path: '/', component: _import_('Period/detail'), name: '课时详情' }
        ]
    },
    { 
        path: '/creation', 
        name: '创意集', 
         meta: { 
            slide: 1 ,
            login: true
        },
        component: _import_('Layout/index'),
        children: [
            { path: '/', component: _import_('Creation/index'), name: '创意集' }
        ]
    },
        { 
        path: '/statistic', 
        name: '看统计', 
         meta: { 
            slide: 1 ,
            login: true
        },
        component: _import_('Layout/index'),
        children: [
            { path: '/', component: _import_('Statistic/index'), name: '看统计' }
        ]
    },
    
   
]
export const asyncRouterMap = [

]

export const router = new Router({
    // mode: 'history',
    routes: constantRouterMap
})
