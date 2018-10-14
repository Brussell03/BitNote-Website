<template>
  	<div id="app">
		<app-header id="app-header"></app-header>
    	<router-view></router-view>
  	</div>
</template>

<script>
import header from './components/header.vue';
export default {
	name: "app",
	data() {
		return {
			
		}
	},
	beforeMount: function() {
		if(this.activeUser.active) {
			this.$http.get('https://bitnote-50e75.firebaseio.com/users/' + this.activeUser.id + '/notes.json').then(function(data) {
				return data.json();
			}).then(function(data) {
				var i = 0
				for(let key in data) {
					this.notes.push(data[key]);
					this.notes[i].id = key;
					i++;
				}
				console.log(1);
				console.log(this.notes.length);
				for(var i = 0; i < this.notes.length; i++) {
					console.log(2);
					if(this.notes[i].shared === true) {
						console.log(3);
						console.log(this.notes[i]);
						console.log(this.notes[i].shareLink);
						var link = this.notes[i].shareLink;
						this.$http.get(this.notes[i].shareLink).then(function(data) {
							return data.json();
						}).then(function(data) {
							this.notes[i] = data;
							console.log(this.notes[i]);
							this.notes[i].shared = true;
							this.notes[i].shareLink = link;
						});
					}
				}
			});
		}
	},
	components: {
		'app-header': header
	},
	computed: {
		activeUser() {
			return this.$store.state.activeUser;
		},
        notes() {
            return this.$store.state.notes;
        }
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
	position: fixed;
	top: 0;
	width: 100%;
	z-index: 100;
}
input:focus, select:focus, textarea:focus, button:focus {
	outline: none;
}
</style>
