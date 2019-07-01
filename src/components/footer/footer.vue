<template>
	<div class="footer" id="footer">
		<el-row>
			<el-col :span="6">
				<div class="grid-content bg-purple-left">

					<el-dropdown @command="handleCommand">
						<div class="el-dropdown-link">
							<img class="user-photo" :src="userinfo.userPhoto" />
							<span class="user-name">{{userinfo.userName}}</span>
						</div>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item command="userinfo">个人中心</el-dropdown-item>
							<el-dropdown-item command="b">帮助&反馈</el-dropdown-item>
							<el-dropdown-item command="a">设置</el-dropdown-item>
							<el-dropdown-item command="exit">退出</el-dropdown-item>

						</el-dropdown-menu>
					</el-dropdown>
				</div>
			</el-col>
			<el-col :span="14">
				<div class="grid-content bg-purple-dark">
					<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
					 background-color="#FFF" text-color="#666" active-text-color="#33a856" boolean="true">
						<el-menu-item index="Home">首页</el-menu-item>

						<el-submenu index="2">
							<template slot="title">文章</template>
							<el-menu-item index="2-1">技术</el-menu-item>
							<el-menu-item index="2-2">随笔</el-menu-item>
							<el-menu-item index="2-3">总结</el-menu-item>

						</el-submenu>

						<el-submenu index="3">
							<template slot="title">相册</template>
							<el-menu-item index="3-1">风景</el-menu-item>
							<el-menu-item index="3-2">旅游</el-menu-item>
							<el-menu-item index="3-3">生活</el-menu-item>

						</el-submenu>

						<el-submenu index="4">
							<template slot="title">项目</template>
							<el-menu-item index="4-1">java web</el-menu-item>
							<el-menu-item index="4-2">android</el-menu-item>
							<el-menu-item index="4-3">python</el-menu-item>
							<el-menu-item index="4-4">kotlin</el-menu-item>
							<el-menu-item index="4-5">futter</el-menu-item>
							<el-submenu index="4-6">
								<template slot="title">前端</template>
								<el-menu-item index="5-6-1">vue</el-menu-item>
								<el-menu-item index="5-6-2">react</el-menu-item>
								<el-menu-item index="5-6-3">其他</el-menu-item>
							</el-submenu>
						</el-submenu>
						<el-submenu index="5">
							<template slot="title">其他</template>
							<el-menu-item index="5-1">关于</el-menu-item>


						</el-submenu>
					</el-menu>
				</div>
			</el-col>
			<el-col :span="4">
				<div class="grid-content bg-purple">

					<button @click="gotoWrite" class="write-btn">{{btnmsg}}</button>


				</div>
			</el-col>
		</el-row>

	</div>
</template>

<script>
	import photo from "../../assets/logo.png";
	export default {
		name: 'footer',
		data() {
			return {
				activeIndex: '1',
				username: "游客",
				btnmsg: "写文章",
				basephoto: photo,
				userinfo: {
					"uid": "",
					"userName": "游客",
					"userPhoto": photo
				}
			}
		},
		created() {
			if (this.configs.userinfo != undefined) {
				this.userinfo = this.configs.userinfo;

				console.log("获取到用户信息")
			} else if (this.utils.getSaveInfo() != null) {
				this.userinfo = this.utils.getSaveInfo();

			} else {
				this.btnmsg = "登陆用户";
				console.log("加载为空")
			}
			console.log(this.userinfo)
			if (this.userinfo.uid) {
				this.btnmsg = "写文章";
			} else {
				this.btnmsg = "登陆用户";
			}
			if (this.userinfo.userPhoto.length<=0) {
				this.userinfo.userPhoto=this.basephoto;
			}
			console.log(this.userinfo)

		},
		methods: { //初始化事件
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
				if(keyPath=="Home"){
					this.$router.push({
						name: keyPath
					});
				}else{
					
					this.$message("内容暂未开放，敬请期待");
				}
				
				
			},
			gotoWrite: function() {
				console.log(this.userinfo.uid);
				if (this.userinfo.uid) {
					this.$router.push({
						path: '/WriteArticle'
					});
				} else {
					this.$router.push({
						path: '/LoginUser'
					});
				}

			},
			handleCommand(command) {
				if (command == "exit") {
					this.configs.userinfo = null;
					this.utils.clearStorage();
					this.$router.push({
						path: '/LoginUser'
					});
				}else if(command=="userinfo"){
					this.$router.push({
						path: '/Userinfo'
					});
				}
			}
		}
	}
</script>

<style scoped="scoped">
	.footer {
		background-color: white;
		border-bottom: 1px solid gainsboro;
	}

	.write-btn {
		width: 150px;
		border: none;
		padding: 0.68rem;
		border-radius: 6px;
		margin-top: 0.3rem;
		background-color: #13CE66;
		color: white;
		font-size: 1.2rem;

	}

	.user-photo {
		width: 3rem;
		height: 3rem;
		border-radius: 50%;
		vertical-align: middle;
	}

	.user-name {
		margin-left: 0.5rem;
		font-size: 1rem;
	}

	.el-col {
		margin: 0;
		padding: 0;
		height: 60px;
	}

	.bg-purple-left {
		height: 100%;
		margin: 0;
		padding: 0;
		width: 100%;
		line-height: 60px;
	}

	.el-dropdown-link {
		cursor: pointer;
		color: #409EFF;
	}

	.el-icon-arrow-down {
		font-size: 12px;
	}
</style>
