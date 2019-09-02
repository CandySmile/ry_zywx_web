
import { JSEncrypt } from 'jsencrypt';
import APP_CONFIG from '../config/manifest';

const Utils = {
  encrypt(str) {
    let encryptInstance = new JSEncrypt();
    encryptInstance.setPublicKey(APP_CONFIG.publicKey);
    let ret = encryptInstance.encrypt(str);
    return ret;

  },
  dateFormat: (date) => {
    let year = date.getFullYear().toString();
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();
    return year + (month.length < 2 ? '0' + month : month) + (day.length < 2 ? '0' + day : day);
  },
  	getPercent(cur, total) {
				let ret = 0;
				//console.log("getPercent"+cur+"："+total);
				if(total!=0&&!isNaN(cur) && !isNaN(total)) {
					cur = parseInt(cur);
					total = parseInt(total);
					ret = Math.round(cur / total * 100);
				}
				return ret;
			}
};
export default Utils;