<template>
	<article class="home-wrapper">
		<div class="wrap">
			<nav>
				<span :class="{'active':status==''}" @click="changeStatus('')">全部</span>
				<span :class="{'active':status=='1'}" @click="changeStatus('1')">已开始</span>
				<span :class="{'active':status=='2'}" @click="changeStatus('2')">未开始</span>
			</nav>
			<div  class="table-list">
				<div class="table-list-el" v-for="(item,index) in periodListData">
					<div class="table-el-sp col-sort">{{(index+1)|numFilter}}</div>
					<div class="table-el-sp table-el-sp-2">
						<div class="vertical-grid">
							<div class="col-title">标题</div>
							<div>{{item.periodTitle}}</div>
						</div>
					</div>
					<div class="table-el-sp">
						<div class="vertical-grid">
							<div class="col-title">作业提交</div>
							
							<div class="col-cnt-sea">{{item.operationTimes}}</div>
						</div>
					</div>
					<div class="table-el-sp">
						<div class="vertical-grid">
							<div class="col-title">已提交</div>
							<div class="col-cnt-sea">{{item.workTimes}}</div>
						</div>
					</div>
					<div class="table-el-sp">
						<div class="vertical-grid">
							<div class="col-title">开始时间</div>
							<div>{{item.startTime|subs}}</div>
						</div>
					</div>
					<div class="table-el-sp">
						<div class="vertical-grid">
							<div class="col-title">截止时间</div>
							<div>{{item.endTime|subs}}</div>
						</div>
					</div>
					<div class="table-el-sp">
						<div class="vertical-grid">
							<div class="col-title">完成进度</div>
							<div>{{item.workTimes|getPercent(item.operationTimes)}}%</div>
						</div>
					</div>
					<div class="table-el-sp" @click="goPeriodDetail(item.id)"><div class="btn"><img src="../../assets/images/search.png">查看</div></div>
				</div>
					<div class="pager-block" v-if="periodPageTotal>periodPageSize">
				<el-pagination background layout="prev, pager, next" :total="periodPageTotal" :page-size="periodPageSize" @size-change="handleSizeChange" @current-change="handleCurrentChange">
				</el-pagination>
			</div>
				<div class="noData" v-if="periodListData.length==0">暂无数据</div>

			</div>
		
		</div>
	</article>
</template>

<script>
	import { mapGetters } from 'vuex'
		import Utils from '../../util/method'
	export default {
		created() {
			//			console.log("homeIndex" + this.$store.state.user.user.token);
			//			this.$store.dispatch('getHomeTotal', {
			//				token: this.$store.state.user.user.token
			//			});

		},
		mounted() {
			this.id = this.$route.query.courseId||'';
		   this.$options.methods.getList.call(this);
		},
		data(){
			return{
			id:''
			}
		},
		methods: {
			async getList() {
				let data = await this.$store.dispatch('getPeriodList', {
					token: this.$store.state.user.user.token,
					courseId: this.id||this.$store.state.period.courseId,
					status: this.$store.state.period.status,
					pageNo: this.$store.state.period.periodPageNo,
					pageSize: this.$store.state.period.periodPageSize,
					typeId: this.$store.state.home.type,
					grade: this.$store.state.home.grade,
				})
			},
			changeStatus(status) {
				this.$store.state.period.status = status;
				this.$options.methods.getList.call(this);
			},
			handleSizeChange() {

			},
			handleCurrentChange(val) {
				//console.log(`当前页: ${val}`);
				this.$store.state.period.periodPageNo = val;
				this.$options.methods.getList.call(this);
			},
			goPeriodDetail(id) {
				this.$store.dispatch("setPeriodId", {
					id: id
				});
				this.$router.push({path:"/periodDetail",query:{periodId: id}});
			},

		},
	
		filters: {
			subs: (val) => {
				return val ? val.slice(0, 11) : val
			},
			numFilter: (val) => {
				return parseInt(val) ? (parseInt(val) < 10 ? '0' + val : val) : val
			},
			
			getPercent(cur, total) {
				return Utils.getPercent(cur, total);
			}
		},
		computed: {
			...mapGetters([
				'courseId',
				'periodListData',
				'stateMap',
				'status',
				'periodPageNo',
				'periodPageSize',
				'periodPageTotal',
				'newsLoading',
			])
		}
	}
</script>

<style lang="less" scoped>
	.wrap {
		/*width: 1400px;*/
		width: 1200px;
		margin: 0 auto;
		position: relative;
		text-align: left;
		padding-top: 25px;
	}
	/*nav start*/
	
	nav span {
		width: 120px;
		height: 45px;
		text-align: center;
		color: @theme-black;
		background: #fafbfb;
		font-size: 22px;
		display: inline-block;
		line-height: 45px;
		border-radius: 5px;
		margin-right: 20px;
	}
	
	nav .active {
		color: #fff;
		background: @theme-blue;
	}
	/*end*/
	
	.horizon-grid {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.vertical-grid {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	
	.table-list {
		padding: 30px 0;
		min-height: 70%;
		padding-left: 0;
		width: 100%;
		background: #fafbfb;
		.table-list-el {
			.horizon-grid();
			background: #fff;
			height: 132px;
			border-radius: 10px;
			overflow: hidden;
			color: @theme-black;
			font-size: 20px;
			padding-right: 10px;
			box-shadow: 15px 15px 10px -15px #ccc;
			margin-bottom:25px;
			.table-el-sp {
				height: 100%;
				.vertical-grid();
				width:13%;
			}
			.table-el-sp-2{
				width:20%;
			}
			.col-title {
				color: #777;
				font-size: 20px;
				margin-bottom: 35px;
			}
			.col-cnt-sea {
				color: @theme-blue;
				font-size: 25px;
			}
			.col-sort {
				background: url(../../assets/images/sort-bg.png);
				width: 132px;
				height: 100%;
				text-align: center;
				font-size: 50px;
				line-height: 132px;
				color: #fff;
				vertical-align: middle;
				font-weight: bold;
			}
		}
	}
</style>