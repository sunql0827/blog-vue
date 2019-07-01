<template id="cell">
	<div id="cell-group" class="cell-style" @click="clickArticle">
		
		<div class="cell-group">
			<div class="cell-text">
				<p class="cell-title">{{title}}</p>
				<p class="cell-desc-text">{{subhead}}</p>
				<p class="cell-desc-text">
					<span class="desc-text-span">{{author}}</span> 评论 <span class="desc-text-span">{{comment}}</span> 喜欢 <span class="desc-text-span">{{like}}</span>
					<span class="desc-text-span">{{date}}</span> </p>
			</div>
			<!-- <img class="cell-img" :src="img" /> -->
		</div>
		
	</div>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		props: ["id","img", "title", "subhead", "comment", "author", "like", "date"],
		mounted() {

		},
		methods: {
			clickArticle:function(){
				this.$emit("clickarticle",this.id)
			}
		}
	}
</script>
<style scoped="scoped">
	.cell-group {
		display: flex;
	}
	
	.cell-title,
	.cell-desc-text {
		padding: 2px;
		margin: 0px;
		text-align: left;
		font-size: 1.2rem;
	}
	
	.cell-desc-text {
		color: grey;
		font-size: 0.8em;
		margin-top: 2px;
	}
	
	.cell-style {
		padding: 0.8em;
		border-top: solid 1px gainsboro;
	}
	
	.cell-text {
		width: 70%;
	}
	
	.cell-img {
		padding: 10px;
		width: 30%;
		height: 100px;
	}
	
	.desc-text-span {
		margin-right: 0.3333rem;
		color: #666;
	}

</style>