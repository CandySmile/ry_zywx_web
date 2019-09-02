<template>
	<article>
		<div class="wrap">
			<div class="course-cnt">
				<div class="cnt-title">
					<span>内容详情</span>
				</div>
				<div class="cnt-body" v-html="detailData.content">{{detailData.content}}</div>
				<div class="cnt-des">
					<div class="des-item">作业次数：{{detailData.operationTimes}}</div>
					<div class="des-item horizon-grid des-request">
						<div>作业要求：</div>
						<div v-html="detailData.workRequest">{{detailData.workRequest}}</div>
					</div>
					<div class="des-item">提交时间：{{detailData.startTime|subs}} ~ {{detailData.endTime|subs}}</div>
				</div>
				<div class="cnt-attachment" v-if="detailData.pictureId">
					<a :href="fileDownPath">附件：{{detailData.fileName}}</a>
				</div>
			</div>
			<div class="work-list" v-if="workList.length||(auth&&inTime(detailData.startTime,detailData.endTime)&&(detailData.operationTimes>workList.length))">
				<div class="cnt-title">
					<span>作业提交</span>
				</div>
				<div class="work-list-item horizon-grid" v-for="(item,index) in workList">
					<div class="horizon-grid col-span col-title">
						<div class="work-sort">{{(index+1)|numFilter}}</div>
						<div class="work-title">{{item.workTitle}}</div>
					</div>
					<div class="col-span">{{item.createDate|subs}}</div>
					<div class="horizon-grid col-span col-act">
						<div @click="goDetail(item.id,true)" class="btn btn-green" v-if="item.status=='2'"><img src="../../assets/images/edit.png">编辑</div>
						<div @click="goDetail(item.id,false)" class="btn" v-if="item.status!='2'"><img src="../../assets/images/search.png">查看</div>
						<div @click="delWork(item.id)" class="btn" v-if="item.status=='2'"><img src="../../assets/images/delIcon.png">删除</div>
					</div>
				</div>
				<div class="column-act" v-if="auth&&inTime(detailData.startTime,detailData.endTime)&&(detailData.operationTimes>workList.length)">
					<button class="btn btn-blue btn-block" @click="addOne()">添加作业</button>
				</div>
			</div>
			<div class="back" @click="goBack()"><span class="btn">返回</span></div>
		</div>

		<div class="aside_img" @click="closePanel()" v-if="pannelShow">
			<img src="../../assets/images/packUp.png" />
		</div>
		<div v-if="pannelShow" :style="{height:calcheight}" class="aside" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">

			<div class="content" v-if="!canEdit">
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
						<span class="weight">{{workInfo.content}}</span>
						<!--<div class="change_num">50/200</div>-->
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
						<viewer :images="photos" :filter="filterImage">
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
			</div>
			<div class="content" v-if="canEdit">
				<div class="mark">
					{{title}}
				</div>
				<div class="pd24 title">
					<span class="left"><em></em></span>
					<div class="right">
						<span>标题:</span>
						<el-input v-model="workInfo.workTitle" placeholder="请输入标题,不超过25个字符" maxlength="25"></el-input>
					</div>
				</div>
				<div class="pd24 describe">
					<span class="left"><em></em></span>
					<div class="right">
						<span>描述:</span>
						<el-input type="textarea" autosize placeholder="请输入描述内容" v-model="workInfo.content" maxlength="200" show-word-limit>
						</el-input>
						<!--<textarea type="text" v-model="workInfo.content"></textarea>-->
					</div>

				</div>
				<div class="pd24 attachment" v-loading="fileLoading" element-loading-text="上传中" element-loading-spinner="el-icon-loading">
					<span class="left"><em></em></span>
					<div class="right file-block">
						<span>附件:</span><span class="tip">请上传word、ppt、excel类型文档</span>
						<div class="fileList">
							<span class="title" v-if="workInfo.fileId" :title="workInfo.fileName"><img src="../../assets/images/file.png"/><span>{{workInfo.fileName}}</span><img src="../../assets/images/del.png" class="icon-remove" @click="delFile()" /></span>
							<a href="javascript:;" class="file">
								<img src="../../assets/images/upload.png" />上传
								<input type="file" name="" id="file" @change='onUpload($event,"fileId",fileLoading)'>
							</a>
						</div>
					</div>
				</div>
				<div class="pd24 img" v-loading="picLoading" element-loading-text="上传中" element-loading-spinner="el-icon-loading">
					<span class="left"><em></em></span>
					<div class="right">
						<span>图片:</span><span class="tip">请上传6张以内图片</span>

						<div class="imgList clearfix">
							<viewer :images="photos" :filter="filterImage">
								<div class='img_left' v-for="(item,index) in photos">
									<img :src="picHost+getImage(item)" :key="index" />
									<span class="icon-remove icon-remove-sp" @click="clear('pictureId','',index)"></span>
								</div>
								<div class='img_left' v-if="photos.length<6">
									<a href="javascript:;" class="file pic">
										<input type="file" name="" id="" @change='uploadImage($event,"pictureId",picLoading)' accept="image/*" multiple="multiple">
									</a>
								</div>
							</viewer>

						</div>
					</div>
				</div>

				<div class="pd24 video" v-loading="videoLoading" element-loading-text="上传中" element-loading-spinner="el-icon-loading">
					<span class="left"><em></em></span>
					<div class="right">
						<span>视频:</span><span class="tip">建议上传视频时长不超过15s</span>
						<div class="video_in" v-if="workInfo.videoId">
							<video :src="workInfo.videoSrc" controls="controls">
								您的浏览器不支持 video 标签。
							</video>
							<img src="../../assets/images/del.png" class="icon-remove" @click="clear('videoId','videoSrc',0)">
						</div>
						<div class="video-block">
							<a href="javascript:;" class="file videoInner" v-if="!workInfo.videoId">
								<input type="file" name="" id="" @change='onUpload($event,"videoId",videoLoading)' multiple accept="video/*">
							</a>
						</div>
					</div>
				</div>
				<div class="horizon-grid form-act">
					<div class="btn btn-blue" @click="save('1')"><img src="../../assets/images/cloud.png" class="mh35">保存并提交</div>
					<div @click="save('0')" class="btn btn-outline"><img src="../../assets/images/save.png">保存</div>
					<div @click='cancel()' class="btn btn-outline"><img src="../../assets/images/close.png">取消</div>
				</div>
				<div class="holder"></div>
			</div>
		</div>

	</article>
</template>

<script>
	import { mapGetters } from 'vuex'
	import axios from '../../../src/utils/fetch'
	import NETWORK_ERROR from '../../config/networkError';

	function getTimeStamp(value) {
		value = value || '';
		if(value && (String(value).search(/-/g)) > -1) { //有‘-’
			value = value.replace(/-/g, "/"); //兼容ios
		}
		return new Date(value).getTime();
	}
	export default {
		created() {

		},
		updated() {
			var elem = document.querySelector("textarea");
			if(elem) {
				elem.style.zIndex = 2;
			}
		},
		mounted() {
			this.id = this.$route.query.periodId || '';
			this.$options.methods.init.call(this);
		},
		data() {
			return {
				pannelShow: false,
				filePath: '',
				fileDownPath: '',
				filePrePath: '',
				canEdit: true,
				fileLoading: false,
				picLoading: false,
				videoLoading: false,
				title: '',
				loading: false,
				id: '',
				calcheight: `${(window.innerHeight
        ? window.innerHeight
        : document.body.clientHeight)}px`,
			}
		},

		methods: {
			async init() {
				let data = await this.$store.dispatch('getPeriodDetail', {
					token: this.$store.state.user.user.token,
					periodId: this.id || this.$store.state.periodDetail.periodId
				});
				//console.log("pictureId" + this.$store.state.workInfo.workInfo.pictureId);
				if(this.$store.state.periodDetail.detailData.pictureId) {
					let res = await this.$store.dispatch('getFile', {
						token: this.$store.state.user.user.token,
						id: this.$store.state.periodDetail.detailData.pictureId
					});
					if(res.data && res.data.data) {
						this.filePath = res.data.data.filePath;
						this.fileDownPath = "http://" + res.data.data.filePath;
					}
					//console.log("getFile" + JSON.stringify(res));
				}
			},
			goBack() {
				this.$router.go(-1);
			},
			filterImage(image) {
				//console.log("a");
				return image.match(this.$store.state.home.picHost);
			},
			delWork(id) {
				this.$confirm('是否删除该作业记录?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async() => {
					let data = await this.$store.dispatch('delWork', {
						token: this.$store.state.user.user.token,
						id: id
					});
					if(data.SystemCode == 1) {
						this.$message({
							type: 'info',
							message: '删除成功'
						});
						this.$options.methods.init.call(this);
						//						this.$router.go(0);
					} else {
						this.$message({
							type: 'info',
							message: '删除失败'
						});
					}
				}).catch(() => {
					//					this.$message({
					//						type: 'info',
					//						message: '已取消删除'
					//					});
				});
			},
			delFile(id) {
				this.filePath = "";
				this.fileDownPath = "";
				this.$store.state.workInfo.workInfo.fileId = '';
				this.$store.state.workInfo.workInfo.fileName = '';
				this.$store.state.workInfo.workInfo.fileSrc = "";
			},
			inTime(startTime, endTime) {
				let timeAble = true;
				let sTime = startTime;
				let eTime = endTime;
				let startAble = false;

				var now = new Date();
				if(eTime) {
					eTime = getTimeStamp(eTime);
					//console.log(now.getTime() > eTime);
					if(now.getTime() > eTime) {
						timeAble = false;
					}
				}
				if(timeAble) {
					if(sTime) {
						sTime = getTimeStamp(sTime);
						//console.log(now.getTime() > sTime);
						if(now.getTime() < sTime) {
							timeAble = false;
						}
					}
				}
				return timeAble
			},
			changeStatus(staus) {
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
			async uploadImage(e, domain, loading) {
				let files = e.target.files;
				let len = files.length;
				let curLen = this.photos.length;
				let maxLen = 6;

				if(len + curLen > maxLen) {
					this.$message({
						type: 'info',
						message: '图片上传数量大于6张，请检查后继续'
					});
					return;
				}
				loading = true;
				for(let i = 0; i < files.length; i++) {
					await this.$options.methods.onUpload.call(this, e, domain, loading, i);
				}
				loading = false;
				e.target.value = null;
			},
			clear(domain, refedDomain, index) {
				this.$store.dispatch('delItem', {
					domain: domain,
					index: index,
					refedDomain: refedDomain
				});
			},
			cancel() {
				this.pannelShow = false;
			},
			isFile(val) {
				let reg = /(?:doc|docx|ppt|pptx|xls|xlsx)$/;
				//console.log("isFile" + val + ":" + reg.test(val));
				return reg.test(val)
			},
			async onUpload(e, domain, loading, index) {
				if(e.target.value) {
					index = index || 0;      
					let formData = new FormData(); 
					formData.append('files', e.target.files[index]);
					//console.log("onUpload" + e.target.value); 
					if(domain == 'fileId') { 
						let filename = e.target.value;
						if(!this.$options.methods.isFile(filename)) {
							this.$message({
								type: 'info',
								message: '请上传word、ppt、excel类型文档'
							});
							return;
						}
						let fn = filename.substring(filename.lastIndexOf("\\") + 1);  
						this.$store.state.workInfo.workInfo.fileName = fn;

					}
					loading = true;
					let data = await this.$store.dispatch('uploadFile', {
						formData: formData,
						token: this.$store.state.user.user.token,
						domain: domain
					});
					loading = false;
					//console.log("data" + JSON.stringify(data));
					let ref = {
						fileId: 'fileSrc',
						videoId: 'videoSrc'
					};
					if(data && data.data && data.data.data && data.data.data.length && domain != "pictureId") {

						let realSrc = await this.$store.dispatch("getFile", {
							token: this.$store.state.user.user.token,
							id: this.$store.state.workInfo.workInfo[domain],
							domain: ref[domain]
						})

					}
					if(domain != "pictureId") {
						e.target.value = null;
					}
				}

			},
			valid(obj) {
				let msg = "";
				if(!obj.workTitle) {
					msg = "请输入作业标题";
				} else {
					if(!obj.content) {
						msg = "请输入作业描述";
					} else if(!obj.pictureId) {
						msg = "请上传图片";
					}
				}
				return msg;
			},
			save(type) {
				let params = {
					type: type,
					workTitle: this.$store.state.workInfo.workInfo.workTitle,
					content: this.$store.state.workInfo.workInfo.content,
					periodId: this.$store.state.periodDetail.periodId,
					pictureId: this.$store.state.workInfo.workInfo.pictureId,
					videoId: this.$store.state.workInfo.workInfo.videoId,
					id: this.$store.state.workInfo.workInfo.id,
					fileId: this.$store.state.workInfo.workInfo.fileId,
					fileName: this.$store.state.workInfo.workInfo.fileName,
					token: this.$store.state.user.user.token
				};
				if(type == "1") {
					let msg = this.$options.methods.valid(params);
					if(msg) {
						this.$message({
							type: 'info',
							message: msg
						});
						return;
					}
				}
				let tip = "保存";
				if(type == "1") {
					tip = "提交"
				}
				this.$confirm('是否确认' + tip + '?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async() => {
					this.$store.dispatch('workSave', params).then((res) => {
						if(res.SystemCode == 1) {
							this.$message({
								type: 'info',
								message: tip + '成功'
							});
							this.pannelShow = false;
							this.$options.methods.init.call(this);
							//							this.$router.go(0);
						} else {
							this.$message({
								type: 'info',
								message: tip + '失败：' + (NETWORK_ERROR[res.SystemCode] || {}).msg
							});
						}
						this.pannelShow = false;
					});
				});

			},
			async goDetail(workId, canEdit) {
				this.canEdit = canEdit;
				this.pannelShow = true;
				this.title = "作业详情";
				this.loading = true;
				let data = await this.$store.dispatch('getWorkDetail', {
					workId: workId,
					token: this.$store.state.user.user.token
				}).then((res) => {

				});
				//console.log("loading1");
				if(this.$store.state.workInfo.workInfo.fileId) {
					let realFile = await this.$store.dispatch("getFile", {
						token: this.$store.state.user.user.token,
						id: this.$store.state.workInfo.workInfo.fileId,
						domain: 'fileSrc'
					})
				}
				//console.log("loading2");
				if(this.$store.state.workInfo.workInfo.videoId) {
					let realVideo = await this.$store.dispatch("getFile", {
						token: this.$store.state.user.user.token,
						id: this.$store.state.workInfo.workInfo.videoId,
						domain: 'videoSrc'
					})
				}
				//console.log("loading3");
				this.loading = false;
				//console.log("loading4");

			},
			showPannel() {
				this.pannelShow = true;
			},
			closePanel() {
				this.pannelShow = false;
			},
			addOne() {
				this.$options.methods.showPannel.call(this);
				this.canEdit = true;
				this.title = "添加作业";
				this.$store.dispatch("clearAll");
			},
			getImage(ids) {
				return ids ? (ids.split(",")[0] + "?format=jpeg") : ''
			},

		},

		filters: {
			subs: (val) => {
				return val ? val.slice(0, 11) : val
			},
			numFilter: (val) => {
				return parseInt(val) ? (parseInt(val) < 10 ? '0' + val : val) : val
			},
		},
		computed: {
			photos() {
				let photoArr = [];
				if(this.workInfo.pictureId) {
					photoArr = this.workInfo.pictureId.split(",");
				}
				//console.log("photoArr" + photoArr.length);
				return photoArr;
			},
			photosTotal() {
				let photoArr = [];
				let self = this;
				if(this.workInfo.pictureId) {
					photoArr = this.workInfo.pictureId.split(",");
					photoArr.map(function(item) {
						return self.$store.state.home.picHost + self.$options.methods.getImage(item)
					});
				}
				//console.log("photoArr" + photoArr.length);
				return photoArr;
			},
			filePreview() {
				let filePath = this.$store.state.workInfo.workInfo.fileSrc;
				let href = "https://view.officeapps.live.com/op/view.aspx?src=" + filePath; //预览
				return href;
			},
			...mapGetters([
				'detailData',
				'workList',
				'auth',
				'workInfo',
				'picHost',
				'newsLoading'
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
	
	.holder {
		height: 30px;
	}
	
	.col-span {
		width: 30%;
		justify-content: flex-start;
	}
	
	.col-title {
		width: 40%;
	}
	
	.cnt-title {
		text-align: center;
		vertical-align: middle;
		font-size: 24px;
		margin-bottom: 51px;
		span {
			padding: 20px;
		}
	}
	
	.des-request {
		justify-content: flex-start;
		align-items: flex-start;
	}
	
	.cnt-title:before,
	.cnt-title:after {
		display: inline-block;
		height: 1px;
		background: #d2d2d2;
		content: '';
		min-width: 10%;
		max-width: 30%;
	}
	
	.column-block {
		font-size: 20px;
		color: @theme-black;
		background: linear-gradient(top, #fff, #fafbfb);
		padding: 41px 95px;
	}
	
	.course-cnt {
		.column-block();
		margin-bottom: 13px;
		.cnt-body {
			line-height: 2;
			margin-bottom: 42px;
		}
		.cnt-des {
			font-weight: bold;
			.des-item {
				margin-bottom: 52px;
			}
		}
		.cnt-attachment {
			a {
				color: @theme-blue;
			}
		}
	}
	
	.work-list {
		.column-block();
		background: #fafbfb;
		.cnt-title {
			margin-bottom: 51px;
		}
		.work-list-item {
			width: 100%;
			height: 84px;
			padding: 20px 24px;
			border: 1px solid #fafbfb;
			box-shadow: 15px 15px 10px -15px #fafbfb;
			background: #fff;
			border-radius: 5px;
			margin-bottom: 20px;
		}
		.work-sort {
			background: @theme-light-blue;
			color: @theme-blue;
			width: 50px;
			height: 50px;
			border-radius: 50%;
			line-height: 50px;
			text-align: center;
			margin-right: 42px;
		}
		.btn {
			margin-right: 23px;
			img {
				margin-right: 5px;
			}
		}
		.form-act {
			height: 110px;
			background: #fff;
			box-shadow: 15px 15px 10px -15px #fafbfb;
			padding: 30px 0;
		}
	}
	
	.aside {
		top: 5px;
	}
	
	.aside .content .img .imgList .img_left {
		float: left;
		width: 30%;
		height: 100px;
		margin-right: 5%;
		border-radius: 10px;
		margin-bottom: 20px;
		position: relative;
	}
	
	.aside .content .img .imgList .img_left:nth-child(3n) {
		margin-right: 0;
	}
	
	.aside .content .img .imgList .img_left img {
		width: 100%;
		border-radius: 10px;
	}
	
	.icon-remove {
		position: absolute;
		top: -10px;
		right: -10px;
		width: 20px;
		height: 20px;
	}
	
	.icon-remove-sp {
		background: url(../../assets/images/del.png) no-repeat;
		display: inline-block;
		width: 20px;
		height: 20px;
		right: -10px;
		top: -10px;
		z-index: 10, ;
		text-align: right;
		min-width: 20px;
		background-size: cover;
	}
	
	.aside .content .img .imgList .img_left .icon-remove {
		.icon-remove();
	}
	
	.aside .content .attachment .title .icon-remove {
		right: 0;
		top: 10px;
	}
	
	.aside .content .img .imgList .img_left .icon-remove-sp {
		.icon-remove-sp();
	}
	
	.aside .content .file-block {
		display: inline-block;
	}
	
	.right span {
		min-width: 60px;
	}
	
	.file {
		display: inline-block;
		line-height: 40px;
		color: #fff;
		background: #09aaff;
		font-size: 20px;
		padding: 0 16px;
		padding-left: 16px;
		border-radius: 20px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		position: relative;
		margin-left: 18px;
	}
	
	.file input {
		position: absolute;
		font-size: 100px;
		right: 0;
		top: 0;
		opacity: 0;
	}
	
	.file img {
		margin-right: 10px;
		vertical-align: middle;
	}
	
	.file:hover {
		background: #AADFFD;
		border-color: #78C3F3;
		color: #004974;
		text-decoration: none;
	}
	
	.pic:hover {
		background: url(../../assets/images/addIcon.png);
		background-size: 100% 100%;
		cursor: pointer;
	}
	
	.pic {
		width: 100px;
		height: 100px;
		margin-bottom: 20px;
		background: url(../../assets/images/addIcon.png);
		background-size: 100% 100%;
	}
	
	.videoInner {
		width: 338px;
		height: 100px;
		background: url(../../assets/images/video.png);
	}
	
	.describe .right {
		display: flex;
		align-items: flex-start;
		margin-bottom: 10px;
	}
	
	.describe {
		position: relative;
	}
	
	.describe .change_num {
		position: absolute;
		right: 10px;
		bottom: 10px;
	}
	
	.video-block {
		text-align: center;
		padding-top: 20px;
	}
	
	.el-textarea .el-input__count {
		font-size: 18px !important;
		color: #8ea0c0 !important;
	}
	
	.col-act {
		justify-content: flex-end;
	}
	
	.back {
		width: 100%;
		text-align: left;
		padding-right: 12%;
		.btn {
			background: #fff;
			color: @theme-blue;
			display: inline-block;
			text-align: center;
			width: 100px;
		}
		margin:30px 0;
	}
	
	.btn {
		.mh35 {
			width: 35px;
		}
	}
	
	.tip {
		margin-left: 10px;
		font-size: 18px;
		/*	color:#ccc;*/
	}
	
	.work-title {
		width: 75%;
		margin-right: 20px;
	}
</style>