<template>
	<article class="home-wrapper">
		<!-- loading -->
		<div class="swiper-mask df-c" v-show="newsLoading">
			<CircleLoading></CircleLoading>
		</div>

		<div class="top_shadow">
			<div class="wrap">
				<div class="body_top">
					<div class="top_top">
						<div class="select_part">
							<label>学年</label>
							<el-select v-model="year" placeholder="请选择" @change="timeChange()">
								<el-option class='select_option' v-for="item in optionsYear" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</div>
						<div class="select_part">
							<label>学期</label>
							<el-select v-model="term" placeholder="请选择" @change="timeChange()">
								<el-option class='select_option' v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</div>
					</div>
					<div class="top_center clearfix" v-if="courseList.length">
						<div class="item_center fl" :class="{active:staCourseId==''}" @click="tabChange('')"><span>全部</span></div>
						<div class="item_center fl" :class="{active:staCourseId==item.courseId}" v-for="(item,index) in courseList" @click="tabChange(item.courseId)"><span>{{item.courseName}}</span></div>
					</div>

				</div>
			</div>
		</div>

		</div>
		<!-- 中间 -->

		<div class="wrap body_content clearfix">
			<div class="item_body fl" v-for="(item,index) in staDataList">
				<!--v-for="(item,index) in newsList" @click="goPeriod(item.id)"-->
				<div class="left_part fl">
					<div class="title ellipse" :title="item.courseName+'-'+item.periodTitle">
						<span class="word">{{item.courseName}}-{{item.periodTitle}}</span>
					</div>
					<div class="integral">
						<span>积分<span class="weight">{{item.score||0}}</span></span>
					</div>
					<div class="workSub">
						<span>作业提交<span class="workSubSpan">{{item.workTimes}}/{{item.operationTimes}}</span></span>
					</div>
				</div>
				<div class="right_part fl">
					<div><span>{{item.workTimes|getPercent(item.operationTimes)}}%</span></div>
				</div>
			</div>
			<div class="noData" v-if="staDataList.length==0">暂无数据</div>
		</div>
		<div class="pager-block" v-if="staPageTotal>staPageSize">
			<el-pagination background layout="prev, pager, next" :total="staPageTotal" :page-size="staPageSize" @size-change="handleSizeChange" @current-change="handleCurrentChange">
			</el-pagination>
		</div>
	</article>

</template>
<script>
	import { mapGetters } from 'vuex'
	import Utils from '../../util/method'
	export default {

		mounted() {
			this.$options.methods.init.call(this);

		},
		data() {
			return {
//				optionsYear: [{
//					value: '2018',
//					label: '2018'
//				}, {
//					value: '2019',
//					label: '2019'
//				}, {
//					value: '2020',
//					label: '2020'
//				}, {
//					value: '2021',
//					label: '2021'
//				}, {
//					value: '2022',
//					label: '2022'
//				}],
				value: '',
				options: [{
					value: '1',
					label: '上学期'
				}, {
					value: '2',
					label: '下学期'
				}]
			}
		},
		methods: {
			async init() {
				//console.log("c");
				let baseInfo = await this.$store.dispatch('getStaCondition', {
					token: this.$store.state.user.user.token
				});
				//console.log("baseInfo");
				let courseInfo = await this.$store.dispatch('getCourseCondition', {
					token: this.$store.state.user.user.token,
					year: this.$store.state.statistic.year,
					term: this.$store.state.statistic.term
				});
				//console.log("b");
				this.$options.methods.getList.call(this);
			},
			async getList() {
				let listInfo = await this.$store.dispatch('getStaticticList', {
					token: this.$store.state.user.user.token,
					year: this.$store.state.statistic.year,
					term: this.$store.state.statistic.term,
					courseId: this.$store.state.statistic.staCourseId,
					pageNo: this.$store.state.statistic.staPageNo,
					pageSize: this.$store.state.statistic.staPageSize,
				});
			},
			handleSizeChange() {

			},
			handleCurrentChange(val) {
				//console.log(`当前页: ${val}`);
				this.$store.state.statistic.staPageNo = val;
				this.$options.methods.getList.call(this);
			},
			tabChange(id) {
				this.$store.state.statistic.staCourseId = id;
				this.$options.methods.getList.call(this);
			},
			async timeChange() {
				let courseInfo = await this.$store.dispatch('getCourseCondition', {
					token: this.$store.state.user.user.token,
					year: this.$store.state.statistic.year,
					term: this.$store.state.statistic.term
				});
				//console.log("b");
				this.$options.methods.getList.call(this);
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
			optionsYear() {
				let now = new Date().getFullYear();
				let yBegin = now - 3;
				let yEnd = now + 3;
				let yArray = [];
				for(var y = yBegin; y <= yEnd; y++) {
					yArray.push({
						label: y + '',
						value: y
					});
				}
				return yArray;
			},

			...mapGetters([
				'staCourseId',
				'courseList',
				'staDataList',
				'staPageNo',
				'staPageSize',
				'staPageTotal',
				"newsLoading",
			]),
			year: {
				get() {
					return this.$store.state.statistic.year
				},
				set(newValue) {
					this.$store.state.statistic.year = newValue;
				}
			},
			term: {
				get() {
					return this.$store.state.statistic.term;
				},
				set(newValue) {
					this.$store.state.statistic.term = newValue;
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	@bar-color: #f4f5f6;
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
		background: #fff;
	}
	
	.body_top .top_top {
		width: 100%;
		/*height: 135px;*/
		/*(图给我量)*/
		height: 100px;
		background-size: 100% 100%;
		margin-top: 24px;
		display: -webkit-flex;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	
	.body_top .top_center {
		height: 80px;
		line-height: 80px;
		border-bottom: 1px solid #ededed;
		font-size: 18px;
		color: #202020;
	}
	
	.body_top .top_center .item_center {
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
	
	.body_content {
		margin-top: 47px;
	}
	
	.body_content .item_body {
		width: 30%;
		margin-right: 5%;
		margin-bottom: 36px;
		border-radius: 5px;
		background: url(../../assets/images/bglan.png) no-repeat;
		background-size: 100% 100%;
		color: #fff;
		padding: 20px 23px;
		box-shadow: -1px 0px 10px 1px #f8f8f8, 0px -1px 10px 1px #f8f8f8, 1px 0px 10px 1px #f8f8f8, 0px 1px 10px 1px #f8f8f8;
		/*box-shadow:0px 15px 10px -15px #ccc;*/
	}
	
	.body_content .item_body:nth-child(2n) {
		background: url(../../assets/images/bglv.png) no-repeat;
		background-size: 100% 100%;
	}
	
	.body_content .item_body:nth-child(3n) {
		margin-right: 0;
	}
	
	.body_content .item_body .left_part {
		width: 70%;
		text-align: left;
	}
	
	.body_content .item_body .left_part .title {
		font-size: 20px;
		margin-bottom: 22px;
	}
	
	.body_content .item_body .left_part .integral {
		margin-bottom: 20px;
	}
	
	.body_content .item_body .left_part .integral .weight {
		font-size: 24px;
		font-weight: bold;
		margin-left: 2px;
	}
	
	.body_content .item_body .left_part .workSub {
		font-size: 16px;
	}
	
	.body_content .item_body .left_part .workSub .workSubSpan {
		padding: 1px 10px;
		font-size: 18px;
		border-radius: 10px;
		background: #fff;
		color: #7ba9ff;
		margin-left: 2px;
	}
	
	.body_content .item_body .right_part {
		width: 30%;
		font-size: 18px;
		/*	background: #000;*/
	}
	
	.select_part {
		border: 1px solid #4C90F7;
		background: #4C90F7;
		border-radius: 20px;
		padding: 0 10px;
		margin-right: 20px;
	}
	
	.select_part label {
		color: #fff;
	}
	
	.select_part .select_option {
		text-align: center;
	}
</style>