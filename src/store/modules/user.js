import { Cookie } from '../../utils/storage'
import axios from '../../../src/utils/fetch'
const user = {
    state: {
        isLogin:Cookie.get('username')?true:false,
        user: {
            name: Cookie.get('username') || '',
            avatar: Cookie.get('avatar') || '',
            token:Cookie.get('token') || '',
            realName:Cookie.get('realName')||''
        },
        footerBarList: [
            {title: '首页', icon: 'home', path: '/home'},
            {title: '西瓜视频', icon: 'video', path: '/video'},
            {title: '微头条', icon: 'comment', path: '/headline'},
            {title: `${Cookie.get('username')?'我的':'未登录'}`, icon: `${Cookie.get('username')?'account':'account1'}`, path: '/account'}
        ]
    },
    actions: {
        login ({commit}, params) {
            return new Promise( (resolve, reject) => {
            	//console.log("login");
                axios.post('login', params)
                    .then( res => {
                        //console.log(res);
                        if(res.SystemCode==1&&res.data){
                        commit('LOGIN', res.data)
                       
                       }
                         resolve(res)
                    }).catch( err => {
                        reject(err)
                    })
            })
        },
        esc ({commit}) {
            commit('ESC')
        }
    },
    mutations: {
        LOGIN (state, data) {
        	let realName = data.realName?data.realName.split("的家长")[0]:'';
            state.user = {
                name: data.userName,
                avatar: require('../../assets/images/avatar.png'),
                token:data.token,
                realName:realName
            }
            state.isLogin = true;
            Cookie.set({
                username: data.userName,
                avatar: require('../../assets/images/avatar.png'),
                token:data.token,
                realName:realName
            },'',0.1/24)
        },
        ESC (state) {
            state.user = {
                name: '',
                avatar: '',
                token:'',
                realName:''
            }
            Cookie.remove(['username', 'avatar','token','realName'])
        }
    }
}
export default user
