<template>
	<article class="home-wrapper">
		<TopBar @filterChange="getList()"></TopBar>
		<!-- 中间 -->

		<div class="wrap body_content clearfix">
			<div class="item_body fl" v-for="(item,index) in newsList" @click="goPeriod(item.id)">
				<div class="top_part">
					<div class="title">
						<em></em>
						<span class="word ellipse" :title="item.courseName">{{item.courseName}}</span>
						<span class="title_right"><span class="num">{{item.period}}</span>课</span>
					</div>
					<div class="time">{{item.startTime|subs}}-{{item.endTime|subs}}</div>
				</div>
				<div class="bottom_part">
					<span> {{item.title}}</span>
				</div>
			</div>
			<div class="noData" v-if="newsList.length==0">暂无数据</div>
		</div>
		<div class="pager-block" v-if="pageTotal>homePageSize">
			<el-pagination background layout="prev, pager, next" :total="pageTotal" :page-size="homePageSize" @size-change="handleSizeChange" @current-change="handleCurrentChange">
			</el-pagination>
		</div>
	</article>

</template>
<script>
	import { mapGetters } from 'vuex'
	import TopBar from './topbar/index.vue'
	import Utils from '../../util/method'
	export default {
		components: {
			TopBar,

		},
		mounted() {
			//console.log("mounted");
			this.$options.methods.init.call(this);
		},
		methods: {
			async getList() {
				this.$showLoading("数据加载中");
				let data = await this.$store.dispatch('getHomeList', {
					token: this.$store.state.user.user.token,
					typeId: this.$store.state.home.type,
					grade: this.$store.state.home.grade,
					pageNo: this.$store.state.home.homePageNo,
					pageSize: this.$store.state.home.homePageSize
				})
				this.$hideLoading();
			},
			async init() {

				await this.$store.dispatch('getHomeTotal', {
					token: this.$store.state.user.user.token
				});
				//console.log("init");
				await this.$options.methods.getList.call(this)

			},
			handleSizeChange() {

			},
			handleCurrentChange(val) {
				//console.log(`当前页: ${val}`);
				this.$store.state.home.homePageNo = val;
				this.$options.methods.getList.call(this);
			},
			goPeriod(id) {
				this.$store.dispatch('setCourseId', {
					id: id
				});
				this.$store.state.period.status = '';
				this.$router.push({path:"/period",query:{courseId: id}});
			}
		},
		filters: {
			subs: (val) => {
				return val ? val.slice(0, 11) : val
			},
			getPercent(cur, total) {
				return Utils.getPercent(cur, total);
			}
		},
		computed: {
			...mapGetters([
				'newsList',
				'newsLoading',
				'homeNewsPrevIndex',
				'homeEnd',
				'totalData',
				'gradeFilter',
				'typeFilter',
				'grade',
				'type',
				'homePageNo',
				'homePageSize',
				'pageTotal'
			])
		}
	}
</script>
<style lang="less" scoped>
	.home-wrapper {
		overflow-y: scroll;
	}
	
	.swiper-mask {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0.4rem;
		background: #f4f4f4;
		z-index: 9;
	}
	
	#swiper-container {
		width: 100%;
		height: e("calc(100% - 0.4rem)");
		.swiper-box {
			width: 100%;
			height: 100%;
			overflow-y: scroll;
		}
		.item {
			padding: 0.2rem 0.1rem;
			h4 {
				color: @font-normal;
			}
			p {
				font-size: 0.16rem;
				line-height: 0.2rem;
				margin: 0.1rem 0;
			}
			.small-box {
				>* {
					display: inline-block;
					vertical-align: middle;
					font-size: 0.1rem;
					margin-right: 0.04rem;
					color: #999;
				}
			}
		}
		.item-l {
			width: 70%;
			padding-right: 10px;
		}
		.item-r {
			width: 30%;
			img {
				width: 100%;
			}
		}
	}
	
	.nav {
		height: 57px;
		line-height: 57px;
		background: #4c90f7;
		color: #fff;
		font-size: 18px;
	}
	
	.wrap {
		/*width: 1400px;*/
		/*(图给我量)*/
		width: 1200px;
		margin: 0 auto;
	}
	
	.wrap .nav_left em {
		display: inline-block;
		width: 35px;
		height: 35px;
		border-radius: 50%;
		background: #fff;
		vertical-align: middle;
	}
	
	.sub_item {
		margin-left: 103px;
		font-size: 24px;
		position: relative;
	}
	
	.sub_item.active em {
		position: absolute;
		content: '';
		width: 0;
		height: 0;
		border: 10px solid;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		border-color: transparent transparent #fff;
	}
	
	.nav_right img {
		width: 35px;
		height: 35px;
		border-radius: 50%;
	}
	/*body——body_top*/
	
	.top_shadow {
		box-shadow: 0px 15px 10px -15px #ccc;
	}
	
	.body_top .top_top {
		width: 100%;
		height: 100px;
		background: url(../../assets/images/bglv.png) no-repeat;
		background-size: 100% 100%;
		margin-top: 24px;
		display: -webkit-flex;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius:10px;
	}
	
	.body_top .top_top .item_top {
		width: 25%;
		text-align: center;
		color: #fff;
	}
	
	.body_top .top_top .item_top .num {
		font-size: 34px;
		font-weight: 700;
	}
	
	.body_top .top_top .item_top .mark {
		font-size: 20px;
	}
	
	.body_top .top_center {
		height: 80px;
		line-height: 80px;
		border-bottom: 1px solid #ededed;
		font-size: 18px;
		color: #202020;
	}
	
	.body_top .top_center .item_center {
		width: 80px;
		margin-right: 20px;
	}
	
	.body_top .top_center .item_center span {
		padding: 2px 12px;
	}
	
	.body_top .top_center .active span {
		border-radius: 20px;
		background: #3fe098;
		color: #fff;
	}
	
	.body_top .top_bottom {
		height: 70px;
		line-height: 70px;
		font-size: 18px;
		color: #202020;
	}
	
	.body_top .top_bottom .item_bottom {
		margin-right: 20px;
	}
	
	.body_top .top_bottom .item_bottom span {
		padding: 2px 12px;
	}
	
	.body_top .top_bottom .active span {
		border-radius: 20px;
		background: #3fe098;
		color: #fff;
	}
	
	.body_content {
		margin-top: 47px;
	}
	
	.body_content .item_body {
		background: #fff;
		width: 30%;
		margin-right: 5%;
		margin-bottom: 36px;
		border-radius: 5px;
		box-shadow: -1px 0px 10px 1px #f8f8f8, 0px -1px 10px 1px #f8f8f8, 1px 0px 10px 1px #f8f8f8, 0px 1px 10px 1px #f8f8f8;
		/*box-shadow:0px 15px 10px -15px #ccc;*/
	}
	
	.body_content .item_body:nth-child(3n) {
		margin-right: 0;
	}
	
	.body_content .top_part {
		border-bottom: 1px solid #f1f1f1;
		padding-top: 14px;
	}
	
	.body_content .top_part .title {
		display: flex;
		align-items: center;
		position: relative;
	}
	
	.body_content .top_part .title em {
		display: inline-block;
		width: 10px;
		height: 40px;
		border-radius: 0 10px 10px 0;
		background: #4C90F7;
		margin-right: 13px;
	}
	
	.body_content .top_part .title .word {
		font-size: 22px;
		color: #202020;
	}
	
	.body_content .top_part .title .title_right {
		font-size: 16px;
		color: #fff;
		background: #4C90F7;
		padding: 5px 5px 5px 15px;
		border-radius: 20px 0 0 20px;
		position: absolute;
		right: 0;
	}
	
	.body_content .top_part .title .title_right .num {
		font-size: 22px;
	}
	
	.body_content .top_part .time {
		text-align: left;
		font-size: 20px;
		margin: 16px 0 26px 23px;
	}
	
	.body_content .bottom_part {
		text-align: left;
		height: 60px;
		line-height: 60px;
		padding-left: 23px;
	}
	
	.body_content .bottom_part span {
		color: #2aacf8;
		padding: 8px;
		border-radius: 20px;
		background: #e9f1fd;
	}
</style>