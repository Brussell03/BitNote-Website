<template>
    <nav class="navbar">
        <div class="navbar-container">
            <router-link to="/dashboard" class="navbar-title">BitNote</router-link>
            <router-link to="/" class="header-hover">Home</router-link>
			<router-link to="/dashboard" class="header-hover" v-show="this.activeUser.active">Dashboard</router-link>
        </div>
        <div  class="navbar-container">
			<router-link to="/login" class="header-hover" v-show="!this.activeUser.active">
				<div class="login-button">
					<span class="login">Login</span>
				</div>
			</router-link>
			<div class="dropdown" v-show="this.activeUser.active">
				<span class="header-hover">{{ activeUser.username }}</span>
				<div class="dropdown-content">Settings</div>
				<div class="dropdown-content">Logout</div>
			</div>
        </div>
    </nav>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    computed: {
      activeUser() {
        return this.$store.state.activeUser;
      }
    }
}
</script>

<style>
.navbar {
    background: #5772e9;
    display: flex;
}
.navbar-container {
    flex: 1;
}
.navbar-container:nth-child(1) {
	margin-left: 3em;
}
.navbar-container:nth-child(2) {
	margin-right: 3em;
	text-align: right;
}
.navbar div a {
    font-size: 2rem;
    color: #fff;
    text-decoration: none;
}
.navbar-title {
    margin-right: 1em;
    font-weight: bolder;
}
.dropdown {
    position: relative;
    display: inline-block;
	width: auto;
	height: 100%;
}
.dropdown:hover {
	background-color: #3f59cc;
}
.dropdown span {
	font-size: 2rem;
	color: #fff;
	height: 100%;
	text-align: right;
	padding: 0 .5em 0 .5em;
}
.dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    width: 100%;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    padding: 12px 16px;
    z-index: 1;
	border-radius: 0;
	text-align: left;
	font-size: 1.5rem;
}
.dropdown:hover .dropdown-content {
    display: block;
}
.dropdown-content:hover {
	background-color: #aaa;
}
.header-hover {
	height: 100%;
	display: inline-block;
	padding: 0 .5em 0 .5em;
}
.header-hover:hover {
	background-color:#3f59cc;
}
</style>
