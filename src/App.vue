<template>
	<div id="app">
		<router-view></router-view>
		<main-tab-bar/>
	</div>
</template>

<script>
	import MainTabBar from 'components/content/ManTabBar'

	export default {
		name: 'app',
		components: {
			MainTabBar
		}
	}
</script>

<style>
	@import url("assets/css/base");
</style>
