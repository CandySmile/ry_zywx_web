<template>
	<div id="app">
		<transition :name="animate">
			<keep-alive v-if="$store.state.user.isLogin">
				<router-view id="view"></router-view>
			</keep-alive>
		</transition>
		<Login :class="{'login-active': isLogin}" @close="$store.state.user.isLogin=false" v-if="!($store.state.user.isLogin)"></Login>
		<FullCircleLoading v-show="pageLoading"></FullCircleLoading>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
	import Login from './components/Login/index'
	export default {
		components: {
			Login
		},
		data() {
			return {
				animate: ''
			}
		},
		watch: {
			$route(to, from) {
				/*
				0: 不做动画
				1: 左切换
				2: 右切换
				3: 上切换
				4: 下切换
				 */
				let animate = this.$router.animate || to.meta.slide
				if(!animate) {
					this.animate = ''
				} else {
					this.animate = animate === 1 ? 'slide-left' :
						animate === 2 ? 'slide-right' :
						animate === 3 ? 'slide-top' :
						animate === 4 ? 'slide-bottom' : ''
				}
				this.$router.animate = 0
			}
		},
		computed: {
			...mapGetters([
				'isLogin',
				'pageLoading'
			])
		}
	}
</script>
<style lang="less">
	#app {
		width: 100%;
		height: 100%;
		.login-active {
			opacity: 1;
			top: 0;
		}
	}
	
	#view {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
	}
	
	.slide-left-enter,
	.slide-right-leave-active {
		opacity: 0;
		transform: translate(100%, 0);
	}
	
	.slide-left-leave-active,
	.slide-right-enter {
		opacity: 0;
		transform: translate(-100%, 0);
	}
	
	.slide-top-enter,
	.slide-bottom-leave-active {
		opacity: 0;
		transform: translate(0, 100%);
	}
	
	.slide-top-leave-active,
	.slide-bottom-enter {
		opacity: 0;
		transform: translate(0, -100%);
	}
	
	html,
	body {
		width: 100%;
		height: 100%;
	}
	
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
		width: 100%;
		height: 100%;
	}
	
	* {
		margin: 0;
		padding: 0;
	}
	
	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}
	
	.clearfix:after {
		clear: both;
	}
	
	.fl_r {
		float: right;
	}
	
	.fl_l {
		float: left;
	}
	
	.align {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	
	.telphone {
		color: white !important;
		padding-left: 32px;
		background: url("./assets/images/account.png") left center no-repeat;
		background-size: 25px;
		margin-left: 10px;
	}
	
	.el-row {
		outline: none;
	}
	
	.el-button:active {
		color: #e34949;
		border-color: #e34949;
		outline: 0;
	}
	
	.el-button:focus,
	.el-button:hover {
		color: @theme-blue;
		border-color: @theme-blue;
		background-color: #fff;
	}
	
	.el-pagination.is-background .el-pager li:not(.disabled).active {
		background-color: @theme-blue;
		color: #FFF;
	}
	
	.el-pagination.is-background .el-pager li:not(.disabled):hover {
		color: @theme-blue;
	}
	
	.el-textarea .el-input__count {
		font-size: 18px;
		color: #8ea0c0;
		background: inherit;
		right:-10px;
	}
	.aside .el-textarea__inner{
		font-size: 18px;
	}
	.aside .el-input{
		width:85%;
		font-size: 18px;
		color: #8ea0c0;
		background: inherit;
	}
	.demo-regForm .el-input__inner {
		border-top: 0px;
		border-left: 0px;
		border-right: 0px;
		border-radius: 0;
		/* height: 45px;
  line-height: 45px; */
	}
	
	.log-tel-input>input {
		padding-left: 40px;
		background: url("./assets/images/account.png") 10px center no-repeat;
		background-size: 15px;
	}
	
	.log-pass-input>input {
		padding-left: 40px;
		background: url("./assets/images/pwd_icon.png") 10px center no-repeat;
		background-size: 15px;
	}
	/*.log-btn{
	 background: url("./assets/pwd_icon.png") 10px center no-repeat;
}*/
	
	.log-btn:before {
		background: url("./assets/images/pwd_icon.png") 10px center no-repeat;
	}
	
	.confirm-btn {
		width: 100%;
	}
	
	.joblist-form-inline .el-input.is-active .el-input__inner,
	.el-input__inner:focus {
		border-color: #F56C6C;
		outline: 0;
	}
	
	.joblist-form-inline>.el-form-item {
		margin-right: 0px;
	}
	
	#app {
		font-family: "Avenir", Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #5c5c5b;
		margin-top: 0px;
	}
	
	.title-logo {
		padding: 0px 0 0px 50px;
		background: url("./assets/images/logo.png") left center no-repeat;
		background-size: 42px;
		margin-right: 10px !important;
	}
	
	.el-menu.el-menu--horizontal {
		border-bottom: 0;
	}
	
	.nav {
		background-color: #e34949;
		line-height: 52px;
	}
	
	.nav .el-menu-demo {
		width: 1050px;
		margin: auto;
	}
	
	.nav .el-menu-item {
		height: 53px;
		line-height: 53px;
	}
	
	.nav .el-button {
		color: #e34949;
	}
	
	.footer {
		padding: 35px 0px;
		background-color: white;
		text-align: center;
		line-height: 34px;
	}
	
	.footer>p:first-child>img {
		vertical-align: middle;
		margin-right: 10px;
	}
</style>