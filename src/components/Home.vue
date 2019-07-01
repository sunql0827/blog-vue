<template>
	<div class="Home" id="Home">
		<app-footer></app-footer>
		<!-- 这里是页面内容区 -->
		<div class="content">
			<el-row>
				<el-col :span="4">
					<div class="grid-content bg-purple"></div>
				</el-col>
				<el-col :span="16">
					<div class="page-cotent">
						<el-row>
							<el-col :span="14">
								<div class="block">

									<el-carousel height="300px">
										<el-carousel-item v-for="(item,index) in banners" :key="index">
											<img class="banner-img" :src="item.imgurl"/>
										</el-carousel-item>
									</el-carousel>
								</div>
								<ListCell v-for="(item,index) in articlelist" :key="index" @clickarticle="clickMenu" :id="item.id" img="../../static/haha.jpg"
								 :title="item.artTitle" :subhead="item.intro" :date="item.addTime" :like="item.isLike" :comment="item.comment"
								 author="豆豆"></ListCell>

							</el-col>
							<el-col :span="8">
								<div class="btn-group">

									<el-button @click="handleSelect" size="medium" type="primary">7日热门</el-button>
									<el-button @click="handleSelect" size="medium" type="success">30日热门</el-button>
									<el-button @click="handleSelect" size="medium" type="info">优选连载</el-button>
									<el-button @click="handleSelect" size="medium" type="warning">简书版权</el-button>
									<el-button @click="handleSelect" size="medium" type="danger">简书大学堂</el-button>
								</div>
								<div class="card-group">
									<el-card v-for="(item, index) in menus" :key="index" :offset="index > 0 ? 2 : 0" :body-style="{ padding: '10px' }">
										<img src="../assets/img1.jpg" class="image">
										<div style="padding: 14px;" v-on:click.stop="clickMenu(item.id)">
											<span>{{item.name}}</span>
											<div class="bottom clearfix">
												{{item.desc}}
											</div>
										</div>
									</el-card>
								</div>
							</el-col>
						</el-row>

					</div>
				</el-col>
				<el-col :span="4">
					<div class="grid-content bg-purple"></div>
				</el-col>
			</el-row>

		</div>

	</div>
</template>

<script>
	import AppFooter from './footer/footer.vue'
	import ListCell from "../element/ListCell.vue"
	export default {
		name: 'Home',
		components: {
			AppFooter,
			ListCell
		},
		data() {
			return {
				currentDate: new Date(),
				uid: "",
				articlelist: [],
				menus: [{
						name: "商城系统",
						desc: "javaweb+springboot"
					}, {
						name: "学习写作",
						desc: "培养自律良好的写作习惯"
					}, {
						name: "Android深入",
						desc: "ndk开发+自定义view+动画+深入体系架构"
					}

				],banners:[]

			}
		},
		created() {
			var userinfo = this.utils.getSaveInfo();
			if(userinfo.uid.length>0){
				this.uid = userinfo.uid;
			}
			
			this.getInfo();
		},
		methods: { //初始化事件
			getInfo: function() {

				let params = {
					uid:this.uid
				}

				this.$axios.post(this.umcons.serviceAddress.ARTICLE_LIST, params).then(function(response) {
					var result = response.data.data;
					this.articlelist = result.articles;
					this.banners = result.banners;
					console.log(result);
				}.bind(this));
			},
			clickMenu: function(id) {
				this.$router.push({
					name: 'ArticleDetails',
					params: {
						id: id
					}
				});
			},
			handleSelect() {
					this.$message("内容暂未开放，敬请期待");
				
			}

		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped="scoped">
	.el-row {
		margin-bottom: 20px;
	
		&:last-child {
			margin-bottom: 0;
		}
	}
	
	.el-col {
		border-radius: 4px;
	}
	
	.bg-purple-dark {
		background: #99a9bf;
	}
	
	.bg-purple {}
	
	.bg-purple-light {
	
		padding: 10px;
	}

	.grid-content {
		border-radius: 4px;
		min-height: 36px;
	}

	.row-bg {
		padding: 10px 0;
		background-color: #f9fafc;
	}

	.time {
		font-size: 13px;
		color: #999;
	}

	.bottom {
		margin-top: 13px;
		line-height: 12px;
	}

	.button {
		padding: 0;
		float: right;
	}

	.image {
		width: 100%;
		height: 8rem;
		display: block;
	}
	.banner-img{
		width: 100%;
		height: 100%;
	}
	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}

	.clearfix:after {
		clear: both
	}

	.clearfix {
		line-height: 1.2rem;
	}

	.el-carousel__item h3 {
		color: #475669;
		font-size: 14px;
		opacity: 0.75;
		line-height: 150px;
		margin: 0;
	}

	.el-carousel__item:nth-child(2n) {
		background-color: #99a9bf;
	}

	.el-carousel__item:nth-child(2n+1) {
		background-color: #d3dce6;
	}

	.btn-group {
		width: 100%;
		height: 300px;
		margin-top: 0.55555rem;
		margin-bottom: 1rem;
	}

	.btn-group button {
		width: 100%;
		height: 20%;
		margin-bottom: 0.35555rem;
		margin-left: 2.5555rem;
	}

	.block {
		margin-top: 0.5555rem;
		margin-bottom: 0.5555rem;
	}

	.card-group {
		padding: 0.222rem;
		margin-top: 2.55555rem;
		width: 100%;
	}

	.el-card {
		margin-left: 2.8555rem;
		margin-bottom: 0.5555rem;
	}
	.page-cotent{
		background-color: #FFFFFF;
		padding-left: 0.5rem;
		padding-right: 0.5rem;
		text-align: center;
	}
</style>
