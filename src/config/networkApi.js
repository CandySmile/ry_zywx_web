/*
 * 请求接口配置
 * @Author: qk
 * @Date: 2019-07-31
 */

// 外网
export const IP = 'http://192.168.241.41:8080';//张丽
//export const IP = 'http://njzy.huhuschool.com';
//export const IP = 'http://192.168.241.48:8092';  //测试

export const HOST = `${IP}/njzy`;

//上传服务器
//export const IMAGE_SERVER = "http://192.168.241.48:9000";
export const FILE_UPLOAD_CONFIG_OSS = `${HOST}/mobile/sys/file/d2220de938734a46b9c7699ae1c9997e/uploadFile`;
export const IMAGE_GET_CONFIG_OSS = `${HOST}/mobile/sys/file/d2220de938734a46b9c7699ae1c9997e/getHandelImage/`;
export const FILE_GET_CONFIG_OSS = `${HOST}/mobile/sys/file/d2220de938734a46b9c7699ae1c9997e/getFileUrl/`;
const NETWORK_API_CONFIG = {
	// 登录
	login: `${HOST}/mobile/login/userLogin`,
	homeIndex: `${HOST}/mobile/publishCoursePC/totalComplete`,
	homeList: `${HOST}/mobile/publishCoursePC/listData`,
	periodList: `${HOST}/mobile/publishCoursePC/periodListByCourseId`,
	periodDetail: `${HOST}/mobile/workCorrectionPC/listData`,
	workSave: `${HOST}/mobile/workCorrectionPC/save`,
	getWorkDetail: `${HOST}/mobile/workCorrectionPC/getWorkView`,
	getCreationList: `${HOST}/mobile/workCorrectionPC/getRecommendWork`,
	getStaCondition: `${HOST}/mobile/publishCoursePC/getCondition`,
	getCourseCondition: `${HOST}/mobile/publishCoursePC/AllCourseName`,
	getStaticticList: `${HOST}/mobile/publishCoursePC/statistics`,
	delWork: `${HOST}/mobile/workCorrectionPC/delete`,

}
export default NETWORK_API_CONFIG