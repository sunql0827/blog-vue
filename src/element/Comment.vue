<template id="cell">
  <div id="cell-group" class="cell-style" >
  	<div class="cell-group">
  		<img class="cell-img" :src="img"/>
  		<div>
  			<p class="cell-title">{{title}}</p>
  			<p class="cell-desc-text">{{subhead}}</p>
  		</div>
  	</div>
  		<div class="cell-desc">
  			{{comment}}
  		</div>
  		
  </div>
</template>

<script>
	
  export default{
    data(){
      return{
      	
      }
    },
    props:["img","title","subhead","comment"],
    mounted(){
     
    },
    methods:{
     
    }
  }
</script>
<style scoped="scoped">
	.cell-group{
		display: flex;
	}
	.cell-img{
		width: 40px;
		height: 40px;
		border-radius: 20px;
	}
	.cell-title,.cell-desc-text{
		padding: 2px;
		margin: 0px;
		text-align: left;
	}
	.cell-desc-text{
		color: grey;
		font-size: 0.8em;
		margin-top: 2px;
	}
	.cell-desc{
		color: gray;
		font-size: 0.9em;
		text-indent: 2em;
		text-align: left;
		padding: 2px;
	}
	.cell-style{
		padding: 0.8em;
		border-top: solid 1px gainsboro;
	}
</style>
