<template>
	<div id="page" class="page write-page">
		<el-row>
			<el-col :span="4">
				<div class="grid-content bg-purple">
					<el-row class="tac">
						<el-col :span="24">
							<div class="top-button">
								<router-link to="/">
									<el-button size="medium" round>回到首页</el-button>
								</router-link>
							</div>
							<el-button size="medium" @click="dialogAnthology = true" round>新建文集</el-button>
							<el-menu default-active="0" class="el-menu-vertical-demo" @select="handleSelect" @close="handleClose"
							 background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
								<el-menu-item v-for="(item,index) in anthology" :index="item.id+''" :key="index">
									<i class="el-icon-menu"></i>
									<span slot="title">{{item.title}}</span>
								</el-menu-item>

							</el-menu>
						</el-col>

					</el-row>

				</div>
			</el-col>
			<el-col :span="4">
				<div class="grid-content bg-purple-light">
					<div style="padding: 1rem;">
						<el-button size="medium" @click="addArticle" round>新建文章</el-button>
					</div>
					<ol class="article-list">
						<li v-for="(item,index) in articleList" :key="index">
							<div class="article-title" @click="clickItem(index)">
								<i class="el-icon-menu"></i>
								<div class="title-group">
									<p class="article-title-text">{{item.artTitle}}</p>
									<p class="article-title-size">字数{{item.words}}</p>
								</div>

							</div>
						</li>
					</ol>

				</div>
			</el-col>

			<el-col :span="16">
				<div class="grid-content  content-left">
					<div class="write-header">
						<div class="write-title">
							<input class="edit-title" v-model.lazy="articleTitle" type="text" placeholder="请输入标题" />
						</div>
						<div class="write-tools">
							<span class="item-tool" @click="chooseType">插入图片</span>
							<span class="item-tool" @click="dialogVisible = true">插入链接</span>
							<span class="item-tool" @click="onSaveArticle">保存文章</span>
							<span class="item-tool" @click="onIssueArticle">发布文章</span>
						</div>
					</div>
					<div class="write-content-box">
						<div id="mediaedit" class="write-content" contenteditable="true" @mouseup="selectText()">

						</div>
					</div>
					<input type="file" id="upload_file" class="input-file" style="display: none;" name="avatar" ref="avatarInput"
					 @change="fileChange($event)" accept="image/gif,image/jpeg,image/jpg,image/png">
				</div>
			</el-col>
		</el-row>
		<el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleHrefUrlClose">
			<el-input placeholder="请输入链接地址" v-model="hrefUrl" clearable>
			</el-input>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="addHref">确 定</el-button>
				<el-button @click="dialogVisible = false">取 消</el-button>

			</span>
		</el-dialog>
		<el-dialog title="提示" :visible.sync="dialogAnthology" width="30%" :before-close="handleClose">
			<el-input placeholder="请输入文集名称" v-model="anthologyname" clearable>
			</el-input>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="addanthology">确 定</el-button>
				<el-button @click="dialogAnthology = false">取 消</el-button>

			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: "page",
		data() {
			return {
				dialogVisible: false,
				dialogAnthology: false,
				anthologyname: "",
				hrefUrl: "",
				imgList: [],
				size: 0,
				limit: 6, //限制图片上传的数量
				tempImgs: [],
				articleTitle: "",
				content: "",
				desc: "测试内容测试内容测试内容测试内容。",
				articleList: [],
				selectArticleIndex: 0,
				articleindex: 0,
				selectAnthologyIndex: 0,
				anthology: [{
						id: "1",
						title: "技术"
					},
					{
						id: "2",
						title: "学习"
					},
					{
						id: "3",
						title: "随笔"
					},
					{
						id: "4",
						title: "总结"
					}
				],
				userinfo: {},
				artId: 0,
				pageinfo: {},
				uid: "MnF/9XPJEprPvk/EwSLBAg=="
			};
		},
		watch: {
			//普通的watch监听
			articleTitle(val, oldVal) {
				var index = this.selectArticleIndex;
				var list = this.articleList;
				list[index].artTitle = val;
				this.articleList = list;
				this.articleTitle = val;
				console.log("a: " + val, this.articleList);
			},
			content(val, oldVal) {
				// console.log("a: " + val, this.selectArticleIndex);
			}
		},
		created() {
			this.userinfo = this.utils.getSaveInfo();
			console.log(this.userinfo)
			this.uid = this.userinfo.uid;
			this.initPage();
		},
		mounted: function() {
			var that = this;
			var mediaedit = document.getElementById("mediaedit");
			mediaedit.addEventListener(
				"DOMSubtreeModified",
				function(evt) {
					that.content = mediaedit.innerHTML;
				},
				false
			);
		},

		methods: {
			initPage: function() {
				let params = {
					uid: this.uid
				};
				console.log(params);
				var that = this;
				this.$axios.post(this.umcons.serviceAddress.ARTICLE_PAGE, params).then(
					function(response) {
						var result = response.data.data;
						//console.log(result);
						if (result == undefined) {
							that.$message(response.data.msg);
						} else {
							that.pageinfo = result;
							that.anthology = result.anthologies;
							that.articleList = result.articles;
							that.selectAnthologyIndex = result.anthology[0].id;
							that.clickItem(0);
						}
					}.bind(this)
				);
			},
			handleSelect(key, keyPath) {
				this.selectAnthologyIndex = key;
				console.log(key, keyPath);
			},
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			},
			handleHrefUrlClose(done) {
				console.log(this.hrefUrl);
			},
			changeContent: function() {
				var scope = document.getElementById("mediaedit");
				var txtHTML = scope.innerHTML;
				//console.log(txtHTML.length);
			},
			setTextContent: function(text) {
				var mediaedit = document.getElementById("mediaedit");
				mediaedit.innerHTML = text;
			},
			clickItem: function(index) {
					this.selectArticleIndex = index;
					var article = this.articleList[index];
					this.articleTitle = article.artTitle;
					this.content = article.artDesc;
					this.setTextContent(article.artDesc);
				}
				/**
				 * 保存文章
				 */
				,
			onSaveArticle: function() {
				var id = this.articleList[this.selectArticleIndex].id;
				let params = {
					id: id,
					title: this.articleTitle,
					context: this.content,
					uid: this.uid
				};
				console.log(params);
				var that = this;
				this.$axios.post(this.umcons.serviceAddress.UPDATA_ARTICLE, params).then(
					function(response) {
						var result = response.data.data;
						console.log(result);
						if (result == undefined) {
							that.$message(response.data.msg);
						} else {
							that.articleList[that.selectArticleIndex] = result;
							that.$message("提交成功");
						}
					}.bind(this)
				);
			},

			/**
			 * 新增文集
			 */
			onAddAnthology: function() {
				let params = {
					title: this.anthologyname,
					uid: this.uid
				};

				var that = this;
				this.$axios.post(this.umcons.serviceAddress.ADD_ANTHOLOGY, params).then(
					function(response) {
						var result = response.data.data;
						console.log(result);
						if (result == undefined) {
							that.$message(response.data.msg);
						} else {
							that.$message("创建成功");
						}
					}.bind(this)
				);
			},
			onIssueArticle: function() {
				let params = {
					id: this.uid,
					is_release: 2
				};

				var that = this;
				this.$axios.post(this.umcons.serviceAddress.CHANGE_RELEASE, params).then(
					function(response) {
						var result = response.data.data;
						console.log(result);
						if (result == undefined) {
							that.$message(response.data.msg);
						} else {
							that.$message("发布成功");
							setTimeout(that.toDetails(result.id), 2000);
						}
					}.bind(this)
				);
			},
			toDetails: function(id) {
				this.$router.push({
					name: "ArticleDetails",
					params: {
						id: id
					}
				});
			},
			addArticle: function() {
				var date = this.utils.getNowFormatDate();
				this.articleTitle = date;
				this.content = "";
				var list = this.articleList;
				this.selectArticleIndex = list.length - 1;
				let params = {
					artTitle: date,
					artDesc: "",
					artType: this.selectAnthologyIndex,
					userId: this.uid,
					words: 0
				};

				var that = this;
				this.$axios.post(this.umcons.serviceAddress.ADD_ARTICLE, params).then(
					function(response) {
						var result = response.data.data;
						if (result == undefined) {
							that.$message(response.data.msg);
						} else {
							this.articleList = result;
							console.log(this.articleList);
							that.$message("创建成功");
						}
					}.bind(this)
				);

			},
			addImage: function(imageSrc) {
				var scope = document.getElementById("mediaedit");
				var frameDiv = document.createElement("img");
				frameDiv.src = imageSrc;
				frameDiv.style.width = "80%";
				scope.appendChild(frameDiv);
			},
			onRequetImage: function(imageSrc) {
				let params = {
					file: imageSrc
				};

				var that = this;
				this.$axios.post(this.umcons.serviceAddress.UPLOAD_BASE, params).then(
					function(response) {
						var result = response.data.data;
						console.log(result);
						if (result == undefined) {
							that.$message(response.data.msg);
						} else {
							that.addImage(result);
						}
					}.bind(this)
				);
			},
			addHref: function() {
				var url = this.hrefUrl;
				if (url != undefined) {
					this.dialogVisible = false;
					if (!this.checkURL(url)) {
						url = "https://" + url;
					}
					var desc = this.desc;
					var scope = document.getElementById("mediaedit");
					var txtHTML = scope.innerHTML;
					var arr = txtHTML.split(desc);
					scope.innerHTML = arr.join("<a href='" + url + "'>" + desc + "</a>");
					txtHTML = arr.join(desc);
				} else {
					this.$message("请输入链接地址");
				}
			},
			checkURL: function(URL) {
				var str = URL;
				//判断URL地址的正则表达式为:http(s)?://([\w-]+\.)+[\w-]+(/[\w- ./?%&=]*)?
				//下面的代码中应用了转义字符"\"输出一个字符"/"
				var Expression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
				var objExp = new RegExp(Expression);
				if (objExp.test(str) == true) {
					return true;
				} else {
					return false;
				}
			},
			chooseType() {
				document.getElementById("upload_file").click();
			},
			fileChange(el) {
				if (!el.target.files[0].size) return;
				this.fileList(el.target);
				el.target.value = "";
			},
			fileList(fileList) {
				let files = fileList.files;
				for (let i = 0; i < files.length; i++) {
					//判断是否为文件夹
					if (files[i].type != "") {
						this.fileAdd(files[i]);
					} else {
						//文件夹处理
						this.folders(fileList.items[i]);
					}
				}
			},
			//文件夹处理
			folders(files) {
				let _this = this; //判断是否为原生file
				if (files.kind) {
					files = files.webkitGetAsEntry();
				}
				files.createReader().readEntries(function(file) {
					for (let i = 0; i < file.length; i++) {
						if (file[i].isFile) {
							_this.foldersAdd(file[i]);
						} else {
							_this.folders(file[i]);
						}
					}
				});
			},
			foldersAdd(entry) {
				let _this = this;
				entry.file(function(file) {
					if (_this.limit !== undefined) _this.limit--;
					if (_this.limit !== undefined && _this.limit < 0) return; //总大小
					_this.size = _this.size + file.size;
					_this.fileAdd(file);
				});
			},
			fileAdd(file) {
				//判断是否为图片文件
				if (file.type.indexOf("image") == -1) {
					this.$dialog.toast({
						mes: "请选择图片文件"
					});
				} else {
					let reader = new FileReader();
					let image = new Image();
					let _this = this;
					reader.readAsDataURL(file);
					reader.onload = function() {
						file.src = this.result;
						image.onload = function() {
							let width = image.width;
							let height = image.height;
							file.width = width;
							file.height = height;
							_this.imgList.push({
								file
							});
							console.log(_this.imgList);
						};
						image.src = file.src;
						_this.onRequetImage(file.src);
					};
				}
			},
			delImg(index) {
				this.size = this.size - this.imgList[index].file.size;
				//总大小
				this.imgList.splice(index, 1);
				if (this.limit !== undefined) this.limit = 6 - this.imgList.length;
			},
			selectText: function() {
				if (document.Selection) {
					//ie浏览器
					this.desc = document.selection.createRange().text;
				} else {
					//标准浏览器
					this.desc = window.getSelection().toString();
				}
			},
			addanthology: function() {
				var name = this.anthologyname;
				if (name != undefined && name.length > 0) {
					var anid = this.anthology.length;
					let param = {
						title: name,
						id: anid.toString()
					};
					this.anthology.push(param);
					this.dialogAnthology = false;
					this.onAddAnthology();
				} else {
					this.$message("请输入名称");
				}
			}
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@import url("../css/app.css");

	.el-row {
		padding: 0px;
		margin: 0px;
		width: 100%;
		height: 100%;
	}

	.write-page {
		overflow-y: hidden;

	}

	.el-col {
		border-radius: 4px;
		padding: 0px;
		margin: 0px;
		height: 100%;
		position: relative;
	}

	.grid-content {
		width: 100%;
		overflow-y: hidden;
	}

	.bg-purple-light {
		border-right: solid 1px gainsboro;
		height: 100%;
		overflow-y: scroll;
		background-color: #FFFFFF;
	}

	.bg-purple {
		background-color: #545c64;
		height: 100%;
		margin: 0;
		padding: 0;
	}

	.content-left,
	.write-content,
	.write-content-box {
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		background-color: #FFFFFF;
		overflow-x: hidden;

	}

	.content-left {
		overflow-y: hidden;
		position: relative;
		width: 100%;
	}

	.write-header {
		width:66.66667%;
		position: fixed;
		top: 0;
		left: 33.3333%;
		right: 0;
		height: 7.5rem;
		align-items: center;
	}

	.write-content-box {
		overflow-y: hidden;
		margin-top: 7.5rem;
	}



	.top-button {
		width: 100%;
		height: 10rem;
		line-height: 10rem;
		background-color: #545c64;
	}

	.tac {
		background-color: #545c64;
	}

	.article-list {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.article-list li {
		padding: 0.5rem;
		margin: 0;
		border-top: solid 1px gainsboro;
		border-bottom: solid 1px gainsboro;
	}

	.edit-title {
		width: 100%;
		padding: 1.8rem;
		font-size: 1.5rem;
		border: none;
	}

	.write-title {
		border-bottom: solid 1px gainsboro;
	}



	.write-tools {
		background-color: #545c64;
		width: 100%;
		text-align: center;
		line-height: 1rem;
		padding: 1rem;
	}

	.write-tools span {
		color: white;
		font-size: 1rem;
		border-right: solid 1px white;
		padding-left: 0.5rem;
		padding-right: 0.5rem;
	}

	.write-content {
		width: 98%;
		text-align: left;
		font-size: 1.2rem;
		-webkit-overflow-scrolling: touch;
		overflow-x: scroll;
		padding: 1rem;

	}

	.article-title {
		width: 100%;
		text-align: left;
		display: flex;
		vertical-align: auto;
		line-height: 1rem;
	}

	.article-title i {
		margin-top: auto;
		margin-bottom: auto;
	}

	.article-title-text {
		font-size: 1rem;
		margin: 0px;
		padding: 2px;
	}

	.article-title-size {
		font-size: 0.5rem;
		margin: 0;
	}

	.title-group {
		margin-left: 1rem;
	}
</style>
