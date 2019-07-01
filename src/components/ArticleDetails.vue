<template>
	<div class="hello">
		<app-footer></app-footer>
		<el-row>
			<el-col :span="6">
				<div class="grid-content bg-purple"></div>
			</el-col>
			<el-col :span="12">
				<div class="page-content">
					<h1 style="text-align: left;">{{article.artTitle}}</h1>
					<div class="author-info">
						<img :src="user.userPhoto" class="img-photo" />
						<div style="text-align: left;">
							<p class="title-text">{{user.userName}}</p>
							<p class="title-text"><span>发表时间：{{article.addTime}}</span>
								<span>字数：{{article.words}}</span>
								<span>阅读：{{article.isread}}</span>
								<span>评论：{{article.comment}}</span>
								<span>喜欢：{{article.islike}}</span></p>
						</div>
					</div>
					<div class="page-body" id="content">

					</div>
					<div class="comment-hint">
						<span class="hint-text">想对作者说点什么？</span>

						<el-button type="danger" plain @click="showCommit=!showCommit">我来说两句</el-button>
					</div>
					<div class="commit_boxs" v-if="showCommit">
						<el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea">
						</el-input>
						<div class="commit_btns">
							<el-button type="primary" @click="submitCommit">提交</el-button>
							<el-button @click="clearCommit">清空</el-button>
						</div>

					</div>
					<div>
						<Comment v-for="(item,index) in comments" :key="index" img="../../static/haha.jpg" title="萌萌" :subhead="item.addTime"
						 :comment="item.content"></Comment>

					</div>

				</div>
			</el-col>

			<el-col :span="6">
				<div class="grid-content  content-left">
					<h3>个人分类</h3>
					<ul>
						<li v-for="(item,index) in typelist" :key="index" class="content-li"><span class="content-li-title">{{item.title}}</span>
							<span class="content-li-number">{{item.number}}篇</span></li>

					</ul>
				</div>
			</el-col>
		</el-row>
		<div class="page-bottom">
			<el-row>
				<el-col :span="4">
					<div class=" page-bottom-left"></div>
				</el-col>
				<el-col :span="16">
					<div class=" page-bottom-center"></div>
				</el-col>

				<el-col :span="4">
					<div class=" page-bottom-right"></div>
				</el-col>
			</el-row>
		</div>
		<div class="commit-menu">
			<div class="badge-box" @click="likearticle">
				<el-badge :value="article.islike" class="item" >
					<el-button size="small">喜欢</el-button>
				</el-badge>
			</div>
			<div class="badge-box" @click="showCommit=!showCommit">
				<el-badge :value="article.comment" class="item" >
					<el-button size="small">评论</el-button>
				</el-badge>
			</div>
			<div class="badge-box">
				<el-badge :value="article.isread" class="item">
					<el-button size="small">关注</el-button>
				</el-badge>
			</div>
		</div>
	</div>
</template>

<script>
	import AppFooter from "./footer/footer.vue";
	import Comment from "../element/Comment.vue";
	export default {
		name: "HelloWorld",
		components: {
			Comment,
			AppFooter
		},
		data() {
			return {
				desc: "测试内容测试内容测试内容测试内容。",
				typelist: [{
						title: "android",
						number: 20
					},
					{
						title: "vue",
						number: 10
					},
					{
						title: "react native",
						number: 5
					},
					{
						title: "flutter",
						number: 15
					},
					{
						title: "springboot",
						number: 8
					},
					{
						title: "python",
						number: 10
					}
				],
				articleinfo: {},
				article: {},
				user: {},
				comments: [],
				textarea: "",
				showCommit: false,
				aid: 0,
				uid: 0
			};
		},
		created() {
			this.aid = this.$route.params.id;
			var userinfo = this.utils.getSaveInfo();
			if (userinfo.uid.length > 0) {
				this.uid = userinfo.uid;
			}
			this.getInfo();
		},
		methods: {
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
			},
			clearCommit: function() {
				this.textarea = "";
			},
			submitCommit: function() {
				let params = {
					uid: this.uid,
					aid: this.aid,
					content: this.textarea
				};
				console.log(params);
				var that = this;
				this.$axios.post(this.umcons.serviceAddress.ADD_COMMENT, params).then(
					function(response) {
						console.log(response);
						that.showCommit = false;
						setTimeout(function() {
							that.getInfo();
						}, 1000);


					}.bind(this)
				);
			},
			likearticle: function() {
				let params = {
					id: this.aid,
					islike: 1
				};
				console.log(params);
				var that = this;
				this.$axios.post(this.umcons.serviceAddress.LIKE_ARTICLE, params).then(
					function(response) {
						console.log(response);
							var result = response.data.data;
							this.article = result;
						


					}.bind(this)
				);
			},
			getInfo: function() {

				if (this.aid != undefined) {
					let params = {
						id: this.aid
					};
					console.log(params);
					this.$axios.post(this.umcons.serviceAddress.ARTICLE, params).then(
						function(response) {
							console.log(response);
							var result = response.data.data;
							var article = result.article;
							this.articleinfo = result;
							this.user = result.user;
							this.article = article;
							this.comments = result.comments;
							var content = document.getElementById("content");
							content.innerHTML = article.artDesc;
							console.log(result);
						}.bind(this)
					);
				}
			}
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.el-row {
		margin-bottom: 0px;

		&:last-child {
			margin-bottom: 0;
		}
	}

	.commit_boxs {
		width: 100%;
		border-bottom: solid 1px #DCDCDC;
		padding: 10px;
	}

	.commit_btns {
		display: flex;
		width: 100%;
		padding: 10px;
	}

	.page-content {
		background-color: white;
		padding-left: 2rem;
		padding-right: 2rem;
		padding-top: 2rem;
	}

	.grid-content {

		min-height: 36px;
	}

	.page-bottom {
		min-height: 150px;
		background-color: #dcdcdc;
	}

	.badge-box {
		margin-bottom: 1rem;
	}

	.commit-menu {

		position: fixed;
		right: 5rem;
		display: block;
		bottom: 2rem;
		border-radius: 0.5rem;
		background-color: #DEDEDE;
		z-index: 999;
		padding: 1rem;

	}

	.content-left {
		border: crimson solid 1px;
		background-color: #FFFFFF;
		padding: 5px;
		margin: 1em;
		border-radius: 0.5rem;
	}

	.content-li {
		text-align: left;
		padding: 10px;
		border-bottom: solid gainsboro 1px;
		margin-bottom: 1px;
	}

	.content-li-number {
		position: absolute;
		right: 2em;
	}

	.content-li-title {
		font-weight: bold;
	}

	.author-info {
		display: flex;
		align-items: center;
		padding-top: 10px;
		padding-bottom: 10px;
	}

	.row-bg {
		padding: 10px 0;
		background-color: #f9fafc;
	}



	.img-photo {
		width: 60px;
		height: 60px;
		border-radius: 30px;
	}

	.title-text {
		padding: 0;
		margin: 0;
		color: grey;
	}

	.comment-hint {
		padding: 20px;
		border-bottom: solid 1px #DEDEDE;
		border-top: solid 1px #DEDEDE;
	}

	.hint-text {
		color: crimson;
	}

	.page-body {
		text-align: left;
	}

	.page-body p {
		text-indent: 2rem;
	}

	.body-text {
		text-align: left;
		text-indent: 2em;
	}

	.el-menu--horizontal {
		border: none;
	}

	.page-header {
		border-bottom: solid 1px gainsboro;
		padding: 0px;
	}

	.bg-purple-light {
		background-color: #FFFFFF;
	}
</style>
