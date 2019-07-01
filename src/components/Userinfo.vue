<template>
	<div class="content" id="userinfo">
		<app-footer></app-footer>
		<el-row>
			<el-col :span="4">
				<div class="grid-content bg-purple"></div>
			</el-col>
			<el-col :span="16">
				<div class="grid-content bg-purple-light ">
					<div class="page-infos">
						<img class="badge-photo" :src="users.userPhoto" />
						<div class="badge-baseinfos">
							<h2 class="badge-title">{{users.userName}}</h2>
							<div class="badge-boxs">
								<div class="badge-box">
									<el-badge :value="articlelist.length" class="item">
										<el-button size="small">文章篇数</el-button>
									</el-badge>
								</div>
								<div class="badge-box">
									<el-badge :value="50" class="item">
										<el-button size="small">关注</el-button>
									</el-badge>
								</div>
								<div class="badge-box">
									<el-badge :value="55" class="item">
										<el-button size="small">收获喜欢</el-button>
									</el-badge>
								</div>
								<div class="badge-box">
									<el-badge :value="231231" class="item">
										<el-button size="small">字数</el-button>
									</el-badge>
								</div>
							</div>
						</div>
					</div>
					<div class="content-child">
						<div class="cell-title">
							轮播设置(最多上传5张)
							<span class="cell-title-subhead" @click="onUpdataDialog()">
								<el-button size="small">确定上传</el-button>
							</span>

						</div>
						<updatas :datas="imglist" @callbackimg="onImgBack"></updatas>
					</div>
					<div class="content-child">
						<div class="cell-title">
							个人作品(10)<span class="cell-title-subhead"></span>

						</div>
						<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
							<el-menu-item index="1">文章</el-menu-item>
							<el-menu-item index="2">评论</el-menu-item>
							<el-menu-item index="3">图集</el-menu-item>
							<el-menu-item index="4">项目</el-menu-item>
						</el-menu>
						<ListCell v-for="(item,index) in articlelist" :key="index" @clickarticle="clickMenu" :id="item.id" img="../../static/haha.jpg"
						 :title="item.artTitle" :subhead="item.intro" :date="item.addTime" :like="item.isLike" :comment="item.comment"
						 author="豆豆"></ListCell>
					</div>
				</div>
			</el-col>
			<el-col :span="4">
				<div class="grid-content bg-purple"></div>
			</el-col>
		</el-row>
		<el-dialog title="请输入跳转地址" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
			<div>
				<el-input placeholder="请输入内容" v-model="hrefUrl">
					<template slot="prepend">Http://</template>
				</el-input>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="onUpdate">不需要跳转</el-button>
				<el-button type="primary" @click="onUpdate">确定输入</el-button>
			</span>
		</el-dialog>


	</div>
</template>

<script>
	import AppFooter from './footer/footer.vue'
	import ListCell from "../element/ListCell.vue"
	import updatas from "../element/updataimg.vue"
	export default {
		name: 'userinfo',
		components: {
			AppFooter,
			ListCell,
			updatas
		},
		data() {
			return {
				desc: "测试内容测试内容测试内容测试内容。",
				username: "",
				userpwd: "",
				activeIndex: "1",
				hrefUrl: "",
				fileList2: [{
					name: 'food.jpeg',
					url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
				}, {
					name: 'food2.jpeg',
					url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
				}],
				users: {},
				articlelist: [{
					addTime: 1550580624914,
					artDesc: "我有一个中国梦，梦想在最时代的前端...",
					artTitle: "时去三年往不复",
					artType: 3,
					comment: 0,
					id: 17,
					intro: "我有一个中国梦，梦想在最时代的前端...",
					isRelease: 0,
					islike: 0,
					isread: 34,
					type: 0,
					updataTime: 1556352205936,
					userId: "MnF/9XPJEprPvk/EwSLBAg==",
					words: 4409,
				}, {
					addTime: 1550580624914,
					artDesc: "我有一个中国梦，梦想在最时代的前端...",
					artTitle: "时去三年往不复",
					artType: 3,
					comment: 0,
					id: 17,
					intro: "我有一个中国梦，梦想在最时代的前端...",
					isRelease: 0,
					islike: 0,
					isread: 34,
					type: 0,
					updataTime: 1556352205936,
					userId: "MnF/9XPJEprPvk/EwSLBAg==",
					words: 4409,
				}, {
					addTime: 1550580624914,
					artDesc: "我有一个中国梦，梦想在最时代的前端...",
					artTitle: "时去三年往不复",
					artType: 3,
					comment: 0,
					id: 17,
					intro: "我有一个中国梦，梦想在最时代的前端...",
					isRelease: 0,
					islike: 0,
					isread: 34,
					type: 0,
					updataTime: 1556352205936,
					userId: "MnF/9XPJEprPvk/EwSLBAg==",
					words: 4409,
				}],
				comments: [],
				uid: 0,
				imglist: [],
				dialogVisible: false

			}
		},
		created() {
			var userinfo = this.utils.getSaveInfo();
			if (userinfo.uid.length > 0) {
				this.uid = userinfo.uid;
			}
			this.onInitInfo();
		},
		methods: {
			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			},
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
			},
			onImgBack: function(imgs) {
				this.imglist = imgs;
				console.log(imgs);
			},onUpdataDialog:function(){
				if (this.imglist.length == 0) {
					this.$message("请选择上传图片");
					return;
				}
				this.dialogVisible=true;
			},
			onUpdate: function() {
				this.dialogVisible=false;
				if(this.hrefUrl.length>0){
					if(this.hrefUrl.indexOf("http://")==-1){
						this.hrefUrl="http://"+this.hrefUrl;
					}
					
				}
				let params = {
					uid: this.uid,
					href: this.hrefUrl,
					imgs: this.imglist.toString()
				}
				console.log(params)
				var that = this;
				this.$axios.post(this.umcons.serviceAddress.ADD_BANNERS, params).then(function(response) {
					var result = response.data.data;
					console.log(result);
					if (result == undefined) {
						that.$message(response.data.msg);

					} else {
						that.$message("提交成功");
					}

				}.bind(this));
			},
			onInitInfo: function() {

				let params = {
					uid: this.uid
				}
				console.log(params)
				var that = this;
				this.$axios.post(this.umcons.serviceAddress.USERINFO, params).then(function(response) {
					var result = response.data.data;
					console.log(result);
					if (result == undefined) {
						that.$message(response.data.msg);

					} else {
						this.users = result.user;
						this.articlelist = result.articles;
						this.comments = result.comments;
					}

				}.bind(this));

			},
			onRegister: function() {
				this.$router.push('/RegisterUser');
			},
			clickMenu: function(id) {
				this.$router.push({
					name: 'ArticleDetails',
					params: {
						id: id
					}
				});
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.el-row {
		margin-bottom: 20px;

		&:last-child {
			margin-bottom: 0;
		}
	}

	.el-col {}

	.bg-purple-dark {}

	.bg-purple {}

	.bg-purple-light {
		background-color: #FFFFFF;
	}

	.grid-content {

		min-height: 36px;
	}

	.row-bg {
		padding: 10px 0;

	}


	.page-infos {
		display: flex;
		width: 100%;
		padding-left: 2rem;
		padding-top: 2rem;
		padding-bottom: 0.5rem;
		align-items: center;
	}

	.badge-photo {
		width: 4rem;
		height: 4rem;
		border-radius: 50%;
		border: solid 2px #FFFFFF;
	}

	.badge-baseinfos {
		padding: 1rem;
		text-align: left;
	}

	.badge-title {
		color: #FF1234;
	}

	.content-child {
		text-align: left;
		padding: 1rem;
	}

	.badge-boxs {
		display: flex;
		align-items: center;
		padding: 0.5rem;
		line-height: 2rem;
	}

	.badge-box {
		line-height: 2rem;
		margin-right: 2rem;
	}

	.cell-title {
		padding: 1rem;
		border-bottom: solid 1px #DEDEDE;
		border-top: solid 1px #DEDEDE;
		margin-bottom: 10px;
		position: relative;
		align-items: center;
	}

	.cell-title-subhead {
		position: absolute;
		right: 2rem;
		color: #999999;
	}
</style>
