<script type="text/javascript">
	function getNowFormatDate() {
		var date = new Date();
		var seperator1 = "/";
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var strDate = date.getDate();
		if(month >= 1 && month <= 9) {
			month = "0" + month;
		}
		if(strDate >= 0 && strDate <= 9) {
			strDate = "0" + strDate;
		}
		var currentdate = year + seperator1 + month + seperator1 + strDate;
		return currentdate;
	}

	function setSaveInfo(data) {
		localStorage.setItem("userName", data.userName);
		if(data.userPhoto!=undefined&&data.userPhoto!=null){
				localStorage.setItem("userPhoto", data.userPhoto);
			}else{
				localStorage.setItem("userPhoto", "http://www.sunql.top/images/basephoto.jpeg");
			}
		
		localStorage.setItem("uid", data.uid);
	}

	function getSaveInfo() {
		var param = {
			"uid": "",
			"userName": "游客",
			"userPhoto": ""
		}
		var username = localStorage.getItem("userName");
		var userphoto = localStorage.getItem("userPhoto");
		var useruid = localStorage.getItem("uid");
		if(username != null && username != undefined&&username!="undefined") {
			param.userName = username;
		}
		if(userphoto != null && userphoto != undefined&&userphoto!="undefined") {
			param.userPhoto = userphoto;
		}
		if(useruid != null && useruid != undefined&&useruid!="undefined") {
			param.uid = useruid;
		}
		return param;

	}
	function clearStorage(){
		localStorage.removeItem("userName"); 
		localStorage.removeItem("userPhoto"); 
		localStorage.removeItem("uid"); 
	}
	export default {
		getNowFormatDate,
		setSaveInfo,
		getSaveInfo,
		clearStorage
	}
</script>