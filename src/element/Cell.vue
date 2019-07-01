<template id="cell">
  <div id="cell-group" class="cell-group">
  		<img class="cell-img" :src="img"/>
  		<div>
  			<p class="cell-title">{{title}}</p>
  			<p class="cell-desc-text">{{subhead}}</p>
  		</div>
  		
  </div>
</template>

<script>
	
  export default{
    data(){
      return{
      	
      }
    },
    props:["img","title","subhead"],
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
		width: 50px;
		height: 50px;
		border-radius: 25px;
	}
	.cell-title,.cell-desc-text{
		padding: 2px;
		margin: 0px;
		text-align: left;
	}
	.cell-desc-text{
		color: grey;
		font-size: 0.8em;
	}
</style>
