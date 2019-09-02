import axios from 'axios';
import Qs from 'qs';
import { Local,Cookie } from '../../utils/storage'
  API_CONFIG
 from '../config/networkApi';
export const logon = (userName, pwd, successCB, errorCB) => {
  axios({
      method: 'POST',
      url: API_CONFIG.login,
      data: {
        userName: userName,
				passWord: pwd,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      transformRequest: [function (data) {
        // 对 data 进行任意转换处理
        return Qs.stringify(data)
      }],
    })
    .then((response) => {
      successCB && successCB(response.data);
    }).catch((error) => {
      errorCB && errorCB(error);
    })
}

