<template>
	<div class="page" id="login">

		<div class="grid-content bg-center">
			
			<h3>注册用户</h3>
			<div class="demo-input-suffix">
				<span>用户名称：</span>

				<el-input placeholder="请输入用户名" prefix-icon="el-icon-search" v-model="username" type="text">
				</el-input>
			</div>
			<div class="demo-input-suffix">
				<span>电话号码：</span>

				<el-input placeholder="请输入电话号码" prefix-icon="el-icon-search" v-model="userPhone" type="tel">
				</el-input>
			</div>
		
			<div class="demo-input-suffix">
				<span>用户密码：</span>

				<el-input placeholder="请输入用户密码" v-model="userpwd" type="password">
					<i slot="prefix" class="el-input__icon el-icon-search"></i>
				</el-input>
			</div>
			<div class="other-text" @click="isShow=!isShow"> 其他信息 >>></div>
			<div class="otherinfo" v-if="isShow">
				<div class="demo-input-suffix">
				<span>用户年龄：</span>
			
				<el-input placeholder="请输入年龄" prefix-icon="el-icon-search" v-model="userAge" type="number">
				</el-input>
			</div>
			<div class="demo-input-suffix">
				<span>详细地址：</span>

				<el-input placeholder="请输入地址" prefix-icon="el-icon-search" v-model="userAddress" type="text">
				</el-input>
			</div>
			<div class="demo-input-suffix">
				<span>用户性别：</span>
				 <el-radio v-model="userSex" label="1">男</el-radio>
  					<el-radio v-model="userSex" label="2">女</el-radio>
				
			</div>
			</div>
			<div class="btn-group">
				<el-button type="primary" size="medium " @click="onLoginUser">注册用户</el-button>
				
			</div>

		</div>

	</div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      desc: "测试内容测试内容测试内容测试内容。",
      username: "",
      userPhone: "",
      userpwd: "",
      userAge: 18,
      userAddress: "",
      userSex: 1,
			isShow:false
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    onLoginUser: function() {
      if (this.userpwd.length < 8) {
        this.$message("请输入8位以上的密码");
        return;
      }
      if (this.userPhone.length != 11) {
        this.$message("请输入正确的电话号码");
        return;
      }
      let params = {
        userName: this.username,
        userPhone: this.userPhone,
        userPwd: this.userpwd,
        userAge: this.userAge,
        userAddress: this.userAddress,
        userSex: this.userSex
      };
      console.log(params);
      var that = this;
      this.$axios.post(this.umcons.serviceAddress.REGISTER, params).then(
        function(response) {
          var result = response.data.data;
          //console.log(result);
          if (result == undefined) {
            that.$message(response.data.msg);
          } else {
            this.utils.setSaveInfo(result);
            this.configs.userInfo = result;
            console.log(result);
            that.$message("注册成功");
            that.fullscreenLoading = true;
            setTimeout(() => {
              that.fullscreenLoading = false;
              that.$router.go(-1);
            }, 2000);
          }
        }.bind(this)
      );
    }
  }
};
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

.el-button + .el-button {
  margin-left: 0px;
}
.other-text{
	width: 100%;
	text-align: left;
	padding-top: 0.3rem;
	padding-bottom: 0.5rem;
	margin-right: 3rem;
	margin-top: 10px;
	border-top: solid 2px #FFFFFF;
	color: red;
	
}
</style>