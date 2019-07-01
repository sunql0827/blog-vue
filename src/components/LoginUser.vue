<template>
	<div class="page" id="login">

		<div class="grid-content bg-center">
			<img class="center-photo" src="../../static/haha.jpg" />
			<div class="demo-input-suffix">
				<span>用户名称：</span>

				<el-input placeholder="请输入用户名" prefix-icon="el-icon-search" v-model="username" type="tel">
				</el-input>
			</div>
			<div class="demo-input-suffix">
				<span>用户密码：</span>

				<el-input placeholder="请输入用户密码" v-model="userpwd" type="password">
					<i slot="prefix" class="el-input__icon el-icon-search"></i>
				</el-input>
			</div>
			<div class="btn-group">
				<el-button type="primary" size="medium " @click="onLoginUser">登录用户</el-button>
				<el-button type="primary" size="medium " @click="onRegister">注册用户</el-button>
			</div>

		</div>

	</div>
</template>

<script>
	export default {
		name: 'login',
		data() {
			return {
				desc: "测试内容测试内容测试内容测试内容。",
				username: "",
				userpwd: ""

			}
		},
		methods: {
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
			},
			onLoginUser: function() {
				if(this.userpwd.length < 8) {
					this.$message('请输入8位以上的密码');
					return;
				}
				if(this.username.length != 11) {
					this.$message('请输入正确的电话号码');
					return;
				}
				let params = {
					userPhone: this.username,
					userPwd: this.userpwd
				}
				console.log(params)
				var that = this;
				this.$axios.post(this.umcons.serviceAddress.LOGIN, params).then(function(response) {
					var result = response.data.data;
					//console.log(result);
					if(result == undefined) {
						that.$message(response.data.msg);

					} else {
						this.utils.setSaveInfo(result);
						this.configs.userInfo = result;
						console.log(result)
						that.$message("登录成功");
						that.fullscreenLoading = true;
						setTimeout(() => {
							that.fullscreenLoading = false;
							that.$router.go(-1);
						}, 2000);
					}

				}.bind(this));

			},onRegister:function(){
				this.$router.push('/RegisterUser');
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.demo-input-suffix {
		display: flex;
		line-height: 1.2rem;
		align-items: center;
		margin-top: 1rem;
	}
	
	.demo-input-suffix span {
		width: 8rem;
	}
	
	.page {
		position: relative;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		text-align: center;
		background-size: 100% 100%;
		background-image: url(../../static/bg.jpg);
	}
	
	.bg-center {
		width: 350px;
		background-color: gainsboro;
		border-radius: 10px;
		padding: 20px;
		left: 40%;
		right: 40%;
		top: 20%;
		position: absolute;
	}
	
	.center-photo {
		width: 100px;
		height: 100px;
		border-radius: 50px;
		margin-top: 3rem;
		margin-bottom: 2rem;
	}
	
	.btn-group {
		display: block;
		padding: 1rem;
	}
	
	button {
		width: 100%;
		margin-top: 0.3333rem;
		padding: 0.85rem;
	}
	
	.el-button+.el-button {
		margin-left: 0px;
	}
</style>