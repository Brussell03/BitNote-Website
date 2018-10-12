<template>
  	<div id="app">
		<app-header v-bind:activeUser="activeUser" id="app-header"></app-header>
    	<router-view v-bind:activeUser="activeUser"></router-view>
  	</div>
</template>

<script>
import header from './components/header.vue';
export default {
	name: "app",
	data() {
		return {
			activeUser: {
				active: false,
				username: '',
				password: '',
				id: ''
			}
		}
	},
	methods: {
		
	},
	components: {
		'app-header': header
	}
};
</script>

<style>
* {
	box-sizing: border-box;
}
html, body {
	margin: 0;
	padding: 0;
	font-family: 'Arial';
	background-color: #444;
}
div {
	margin: 0;
	padding: 0;
}
.container {
	margin: 0 10em 0 10em;
}
#app-header {
	height: 5vh;
	/*position: sticky;
	position: -webkit-sticky;
	top: 0;*/
	position: fixed;
	top: 0;
	width: 100%;
	z-index: 100;
}
input:focus, select:focus, textarea:focus, button:focus {
	outline: none;
}
</style>
