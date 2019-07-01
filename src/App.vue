<template>
	<div id="app">

		<router-view />
	</div>
</template>

<script>
	export default {
		name: 'App'
	}
</script>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;

	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	p {
		margin-block-start: 0;
		margin-block-end: 0;
	}

	body,
	html,
	#app {
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		background-color: #FFFFFF;
	}
	
	a {
		border: none;
		text-decoration: none;
	}
</style>
