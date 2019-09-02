const getters = {
	/*APP*/
	articleInfo: state => state.app.articleInfo,
	pageLoading: state => state.app.pageLoading,

	/*USER*/
	isLogin: state => state.user.isLogin,
	user: state => state.user.user,
	footerBarList: state => state.user.footerBarList,



	/*首页*/
	newsList: state => state.home.newsList,
	newsLoading: state => state.home.newsLoading,
	homeNewsIndex: state => state.home.newsIndex,
	homeNewsPrevIndex: state => state.home.newsPrevIndex,
	homeEnd: state => state.home.end,
	totalData: state => state.home.totalData,
	gradeFilter: state => state.home.gradeFilter,
	typeFilter: state => state.home.typeFilter,
	grade: state => state.home.grade,
	type: state => state.home.type,
	homePageNo: state => state.home.homePageNo,
	homePageSize: state => state.home.homePageSize,
	pageTotal: state => state.home.pageTotal,
	picHost:state => state.home.picHost,



	/*period*/
	courseId: state => state.period.courseId,
	periodListData: state => state.period.periodListData,
	stateMap: state => state.period.stateMap,
	status: state => state.period.status,
	periodPageNo: state => state.period.periodPageNo,
	periodPageSize: state => state.period.periodPageSize,
	periodPageTotal: state => state.period.periodPageTotal,

	//periodDetail
	detailData: state => state.periodDetail.detailData,
	workList: state => state.periodDetail.workList,
	auth: state => state.periodDetail.auth,
	periodId: state => state.periodDetail.periodId,

	/*workInfo*/
	workInfo: state => state.workInfo.workInfo,
	/*creation*/
	creationList: state => state.creation.creationList,
	creationPageNo: state => state.creation.creationPageNo,
	creationPageSize: state => state.creation.creationPageSize,
	creationPageTotal: state => state.creation.creationPageTotal,
	
	
	/*statistic*/
	year: state => state.statistic.year,
	term: state => state.statistic.term,
	staCourseId: state => state.statistic.staCourseId,
	courseList: state => state.statistic.courseList,
	staDataList: state => state.statistic.staDataList,
	staPageTotal: state => state.statistic.staPageTotal,
	staPageNo: state => state.statistic.staPageNo,
	staPageSize: state => state.statistic.staPageSize,
}
export default getters