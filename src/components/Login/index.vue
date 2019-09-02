<template>
	<div class="home-body">

		<div class="header align">
			<div class="main-block">
				<div class="header-title">
					<img src="../../assets/images/logo.png" />
					<div class="title-cnt">作业在线提交系统</div>
				</div>
				<el-form :model="logonForm" :rules="rules" ref="logonForm" label-width="0px" label-position="left" class="logonForm">
					<el-form-item label prop="tel">
						<el-input type="text" v-model.trim="logonForm.tel" autocomplete="off" placeholder="请输入学号" class="log-tel-input"></el-input>
					</el-form-item>
					<el-form-item label prop="pass">
						<el-input type="password" v-model.trim="logonForm.pass" autocomplete="off" placeholder="输入密码" class="log-pass-input"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="login('logonForm')" id="loginBtn" class="log-btn">登录</el-button>

					</el-form-item>
				</el-form>
			</div>
		</div>
		<div class="content"></div>
	</div>
</template>

<script>
	//	import {logon} from '../../util/data';
	import Utils from '../../util/method';
	import NETWORK_ERROR from '../../config/networkError';
	export default {
		name: 'Login',
		data() {
			var validateTel = (rule, value, callback) => {
				if(value === "") {
					callback(new Error("请输入学号"));
				} else {
					callback();
				}
			};
			var validatePwd = (rule, value, callback) => {
				if(value === "") {
					callback(new Error("请输入密码"));
				} else {
					if(value.trim().length < 6 || value.trim().length > 18) {
						callback(new Error("密码长度为6~18位"));
					} else if(!/^[a-zA-Z0-9]+$/.test(value.trim()) ||
						!/^[a-zA-Z0-9]+$/.test(value.trim())
					) {
						callback(new Error("密码不能含有特殊字符"));
					}
					callback();
				}
			};
			return {
				calcheight: `${(window.innerHeight
        ? window.innerHeight
        : document.body.clientHeight) - 209}px`,
				logonForm: {
					tel: "",
					pass: ""
				},
				rules: {
					tel: [{
						validator: validateTel,
						trigger: "blur"
					}],
					pass: [{
						validator: validatePwd,
						trigger: "blur"
					}]
				}
			};
		},
		methods: {
			login(formName) {
				this.$refs[formName].validate(async valid => {
					if(valid) {
						this.$showLoading("登陆中");
						try {
							let data = await this.$store.dispatch('login', {
								userName: this.logonForm.tel,
								passWord: Utils.encrypt(this.logonForm.pass)
							})
							// console.log("SystemCode"+JSON.stringify(data));
							if(data.SystemCode==1){
								this.$message({
								type: 'info',
								message: '登录成功'
								});
							}else{
								this.$message({
								type: 'info',
								message: (NETWORK_ERROR[data.SystemCode] || {}).msg||'登录失败'
							});
							}
						} catch(e) {
							e = e||{};
							let msg = "登陆失败，请稍后重试";
							if(e.message=='Network Error'){
							  msg ="网络异常，请稍后重试"
                          }
							this.$message({
								type: 'info',
								message:msg
								});
                           //console.log("e"+JSON.stringify(e));
						}
						this.$hideLoading();
						
						//      	 this.$emit('close');
						this.$router.push('/home');
						//        logon(this.logonForm.tel,Utils.encrypt(this.logonForm.pass));
					} else {
						//console.log("error submit!!");
						return false;
					}
				});
			}

		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.home-body {
		background: url("../../assets/images/bg.png") no-repeat;
		background-position: cover;
		padding-top: 18px;
		width: 100%;
		height: 100%;
	}
	
	.header {
		width: 100%;
		margin: auto;
		margin-top: 110px;
		margin: 0 auto;
	}
	
	.content {
		width: 1040px;
		margin: auto;
		background-color: white;
		margin-top: 13px;
	}
	
	.header-l {
		box-sizing: border-box;
		width: 64%;
		height: 397px;
		background: url("../../assets/images/banner.png") left top no-repeat;
		background-size: cover;
	}
	
	.header {
		box-sizing: border-box;
		width: 36%;
		box-shadow: #f1f4f6;
	}
	
	#loginBtn {
		width: 100% !important;
		margin-top: 25px;
	}
	
	.link-box {
		line-height: 20px;
		margin-top: 14px;
	}
	
	.reg-link {
		text-align: right;
		padding-right: 25px;
		border-right: 1px solid #5c5c5b;
	}
	
	.forget-link {
		padding-left: 25px;
	}
	
	.main-block {
		border: 1px solid #8dc2fd;
		border-radius: 20px;
		padding: 16px 40px;
		background: #fff;
	}
	
	.logonForm {
		padding: 30px 0;
	}
</style>