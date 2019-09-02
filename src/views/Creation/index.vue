<template>
	<article class="home-wrapper">
		<!-- loading -->
		<div class="swiper-mask df-c" v-show="newsLoading">
			<CircleLoading></CircleLoading>
		</div>

		<div class="top_shadow">
			<div class="wrap">
				<em class="top_left"></em>
				<span class="word">作品展示</span>
			</div>
		</div>
		<div class="wrap body_content clearfix">
			<div class="item_body fl" v-for="(item,index) in creationList" @click="showDetail(item.id)">
				<div class="top_cont">
					<img :src="picHost+getImage(item.pictureId)" />
				</div>
				<div class="bottom_cont">
					<div class="title" :title="item.workTitle">
						{{item.workTitle}}
					</div>
					<div class="time">
						{{item.createDate|subs}}
					</div>
				</div>
			</div>
			<div class="noData" v-if="creationList.length==0">暂无数据</div>
		</div>
		<div class="pager-block" v-if="creationPageTotal>creationPageSize">
			<el-pagination background layout="prev, pager, next" :total="creationPageTotal" :page-size="creationPageSize" @size-change="handleSizeChange" @current-change="handleCurrentChange">
			</el-pagination>
		</div>
		<div class="aside_img" @click="closePanel()" v-if="pannelShow">
			<img src="../../assets/images/packUp.png" />
		</div>
		<div class="aside" v-if="pannelShow" :style="{height:calcheight}" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">

			<div class="content">
				<div class="mark">
					作业详情
				</div>
				<div class="pd24 title">
					<span class="left"><em></em></span>
					<div class="right">
						<span>标题:</span>
						<span class="weight">{{workInfo.workTitle}}</span>
					</div>
				</div>
				<div class="pd24 describe">
					<span class="left"><em></em></span>
					<div class="right">
						<span>描述:</span>
						<span class="weight" v-html="workInfo.content">{{workInfo.content}}</span>
						<div class="change_num">{{workInfo.content.length}}/200</div>
					</div>
				</div>
				<div class="pd24 attachment">
					<span class="left"><em></em></span>
					<div class="right">
						<span>附件:</span>
						<span class="title" v-if="workInfo.fileId" :title="workInfo.fileName"><img src="../../assets/images/file.png"/><span>{{workInfo.fileName}}</span></span>
						<a class="same" :href="filePreview" v-if="workInfo.fileId" target="_blank">预览</a>
						<a class="same" :href="workInfo.fileSrc" v-if="workInfo.fileId">下载</a>
					</div>
				</div>
				<div class="pd24 img">
					<span class="left"><em></em></span>
					<div class="right">
						<span>图片:</span>
						<viewer :images="photos"  v-if="workInfo.pictureId">
								<div class='imgList'>
									<img :src="picHost+getImage(item)" v-for="(item,index) in photos" />
								</div>
							</viewer>
					</div>
				</div>

				<div class="pd24 video">
					<span class="left"><em></em></span>
					<div class="right">
						<span>视频:</span>
						<div class="video_in" v-if="workInfo.videoId">
							<video :src="workInfo.videoSrc" controls="controls">
								您的浏览器不支持 video 标签。
							</video>
						</div>
					</div>
				</div>
				<div class="holder"></div>
			</div>
			
		</div>
	</article>

</template>
<script>
	import { mapGetters } from 'vuex'

	export default {
		data() {
			return {
				pannelShow: false,
				calcheight: `${(window.innerHeight
        ? window.innerHeight
        : document.body.clientHeight)}px`,
        loading:false
			
			}
		},
		mounted() {
			this.$options.methods.getList.call(this);
		},
		methods: {
			async getList() {
				let data = await this.$store.dispatch('getCreationList', {
					token: this.$store.state.user.user.token,
					pageNo: this.$store.state.creation.creationPageNo,
					pageSize: this.$store.state.creation.creationPageSize
				})
			},
			async showDetail(workId) {
				this.pannelShow = true;
				this.loading=true;
				let data = await this.$store.dispatch('getWorkDetail', {
					workId: workId,
					token: this.$store.state.user.user.token
				}).then((res) => {
				});
				if(this.$store.state.workInfo.workInfo.fileId) {
					let realFile = await this.$store.dispatch("getFile", {
						token: this.$store.state.user.user.token,
						id: this.$store.state.workInfo.workInfo.fileId,
						domain: 'fileSrc'
					})
				}
				if(this.$store.state.workInfo.workInfo.videoId) {
					let realVideo = await this.$store.dispatch("getFile", {
						token: this.$store.state.user.user.token,
						id: this.$store.state.workInfo.workInfo.videoId,
						domain: 'videoSrc'
					})
				}
				this.loading=false;
			},
			handleSizeChange() {

			},
			handleCurrentChange(val) {
				//console.log(`当前页: ${val}`);
				this.$store.state.creation.creationPageNo = val;
				this.$options.methods.getList.call(this);
			},
			goPeriod(id) {
				//this.$store.dispatch('esc');
				this.$store.state.period.courseId = id;
				this.$router.push("/period");
			},
			getImage(ids) {
				return ids ? (ids.split(",")[0] + "?format=jpeg") : ''
			},
			closePanel() {
				this.pannelShow = false;
			}
		},
		filters: {
			subs: (val) => {
				return val ? val.slice(0, 11) : val
			}
		},
		computed: {
			photos() {
				let photoArr = [];
				if(this.workInfo.pictureId) {
					photoArr = this.workInfo.pictureId.split(",");
				}
				return photoArr;
			},
			filePreview() {
				let filePath = this.$store.state.workInfo.workInfo.fileSrc;
				let href = "https://view.officeapps.live.com/op/view.aspx?src=" + filePath; //预览
				return href;
			},
			...mapGetters([
				'newsLoading',
				'creationList',
				'creationPageNo',
				'creationPageSize',
				'creationPageTotal',
				'picHost',
				'workInfo',
			])
		}
	}
</script>

<style scoped>
	.wrap {
		/*width: 1400px;*/
		/*(图给我量)*/
		width: 1200px;
		margin: 0 auto;
		position: relative;
		text-align: left;
	}
	/*body——body_top*/
	
	.top_shadow {
		height: 74px;
		line-height: 74px;
		box-shadow: 0px 15px 10px -15px #ccc;
		position: relative;
	}
	
	.top_shadow .top_left {
		position: absolute;
		width: 6px;
		height: 30px;
		border-radius: 3px;
		background: #4C90F7;
		top: 50%;
		transform: translateY(-50%);
		left: 0;
	}
	
	.top_shadow .word {
		font-size: 26px;
		color: #659df8;
		margin-left: 13px;
	}
	/*body_content*/
	
	.body_content .item_body {
		width: 19%;
		margin-right: 1%;
		margin-top: 50px;
		border-radius: 5px;
		box-shadow: -1px 0px 10px 1px #e5e8ea, 0px -1px 10px 1px #e5e8ea, 1px 0px 10px 1px #e5e8ea, 0px 1px 10px 1px #e5e8ea;
	}
	
	.body_content .item_body:nth-child(5n) {
		margin-right: 0;
	}
	
	.body_content .item_body .top_cont {
		width: 100%;
	}
	
	.body_content .item_body .top_cont img {
		width: 100%;
		height: 200px;
		border-radius: 5px 5px 0 0;
	}
	
	.body_content .item_body .bottom_cont {
		margin: 20px;
		margin-right: 0;
	}
	
	.body_content .item_body .bottom_cont .title {
		font-size: 16px;
		color: #202020;
		margin-bottom: 18px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	.body_content .item_body .bottom_cont .time {
		font-size: 14px;
		color: #8c8c8c;
	}
	
	
</style>