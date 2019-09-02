<template>
	<div class="top_shadow">
		<div class="wrap">
			<div class="body_top">
				<div class="top_top">
					<div class="item_top">
						<div class="num">{{totalData.totalScoal||0}}</div>
						<div class="mark">学习总得分</div>
					</div>
					<div class="item_top">
						<div class="num">{{totalData.complete}}</div>
						<div class="mark">累计完成学习</div>
					</div>
					<div class="item_top">
						<div class="num">{{totalData.periodsCount}}</div>
						<div class="mark">学习课时</div>
					</div>
					<div class="item_top">
						<div class="num">{{totalData.complete|getPercent(totalData.periodsCount)}}%</div>
						<div class="mark">学习进度</div>
					</div>
				</div>
				<div class="top_center clearfix">
					<div class="item_center fl" @click="gradeChange('')" :class="{active:grade==''}"><span>全部</span></div>
					<div class="item_center fl" v-for="(item,index) in gradeFilter" @click="gradeChange(item)" :class="{active:item==grade}"><span>{{item}}</span></div>
				</div>
				<div class="top_bottom clearfix">
					<div class="item_bottom fl" :class="{active:type==''}" @click="typeChange('')"><span>全部</span></div>
					<div class="item_bottom fl" v-for="(item,index) in typeFilter" :class="{active:type==item.id}" @click="typeChange(item.id)"><span>{{item.title}}</span></div>

				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
	import Utils from '../../../util/method';
	export default {

		methods: {
			gradeChange(id) {
				//console.log("id" + id);
				this.$store.state.home.grade = id;
				this.$store.state.home.type="";
				this.$emit("filterChange");
			},
			typeChange(id) {
				//console.log("id" + id);
				this.$store.state.home.type = id;
				this.$emit("filterChange");
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
				'type'
			])
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
	}
	
	.body_top .top_top {
		width: 100%;
		/*height: 135px;*/
		/*(图给我量)*/
		height: 100px;
	background: url(../../../assets/images/bglv.png) no-repeat;
		background-size: 100% 100%;
		margin-top: 24px;
		display: -webkit-flex;
		display: flex;
		justify-content: center;
		align-items: center;
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
		font-size: 20px;
		margin: 16px 0 26px 23px;
	}
	
	.body_content .bottom_part {
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