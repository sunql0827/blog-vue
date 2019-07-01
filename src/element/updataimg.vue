<template>
	<div class="updataimg" id="updatas">
		<button @click="chooseType">选择图片</button>
		<div class="imgs_box" v-if="datas.length>0">
			<div class="img_box_item" v-for="(item,index) in datas" :key="index">
				<img class="item_img"  :src="item"/>
			</div>
			
		</div>
		<input type="file" id="upload_file" class="input-file" style="display: none;" name="avatar" ref="avatarInput" @change="fileChange($event)"
		 accept="image/gif,image/jpeg,image/jpg,image/png">
	</div>
</template>

<script>
	export default {
		name: 'updatas',
		data() {
			return {
				imgList: []
				
			}
		},props:{
			datas:Array
		},
		created() {


		},
		methods: { //初始化事件
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
							that.datas.push(result);
							this.$emit("callbackimg", that.datas); 
						}
					}.bind(this)
				);
			}
		}
	}
</script>

<style scoped="scoped">
	.updataimg{
		width: 100%;
	}
	.imgs_box{
		width: 100%;
		min-height: 160px;
		display: block;
		position: relative;
	}
	.img_box_item{
		width: 33%;
		min-height: 60px;
		max-height: 60px;
		padding: 1px;
		float: left;
	}
	.item_img{
		width: 200px;
		height: 160px;
	}
</style>
