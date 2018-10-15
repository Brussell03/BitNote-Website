<template>
    <div id="login-view">
        <h2 class="login-text">Login</h2>
        <div v-if="!submitted">
            <input class="login-input" type="text" placeholder="Username" v-model.lazy="userInput.username" required>
            <input class="login-input" type="password" placeholder="Password" v-model.lazy="userInput.password" required>
            <div class="login-buttons">
                <button class="login-submit" @click="submitLogin()">Login</button>
                <div class="login-extras">
                    <router-link to="/register" class="login-extra">Register Here</router-link>
                    <router-link to="/password/forgot" class="login-extra">Forgot your password?</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userInput: {
                username: '',
                password: '',
            },
            submitted: false
        }
    },
    methods: {
        submitLogin: function() {
            this.$http.get('https://bitnote-50e75.firebaseio.com/users.json').then(function(data) {
                return data.json();
            }).then(function(data) {
                for(let key in data) {
					if(data[key].username === this.userInput.username && data[key].password === this.userInput.password) {
                        console.log('Login successful');
                        this.activeUser.active = true;
						this.activeUser.username = this.userInput.username;
                        this.activeUser.password = this.userInput.password;
                        this.activeUser.id = key;
                        this.activeUser.email = data.email;
                        this.submitted = true;
                        this.getNotes();
                        this.getLists();
                        this.$router.push('/dashboard');
					}
				}
            });
        },
		getNotes: function() {
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
                    for(var i = 0; i < this.notes.length; i++) {
                        if(this.notes[i].shared === true) {
                            var link = this.notes[i].shareLink;
                            this.$http.get(this.notes[i].shareLink).then(function(data) {
                                return data.json();
                            }).then(function(data) {
                                this.notes[i] = data;
                                this.notes[i].shared = true;
                                this.notes[i].shareLink = link;
                            });
                        }
                    }
                });
			}
		},
		getLists: function() {
			if(this.activeUser.active) {
				this.$http.get('https://bitnote-50e75.firebaseio.com/users/' + this.activeUser.id + '/lists.json').then(function(data) {
					return data.json();
				}).then(function(data) {
					var i = 0
					for(let key in data) {
						this.lists.push(data[key]);
						this.lists[i].id = key;
                        i++;
                    }
                    for(var i = 0; i < this.lists.length; i++) {
                        if(this.lists[i].shared === true) {
                            var link = this.lists[i].shareLink;
                            this.$http.get(this.lists[i].shareLink).then(function(data) {
                                return data.json();
                            }).then(function(data) {
                                this.lists[i] = data;
                                this.lists[i].shared = true;
                                this.lists[i].shareLink = link;
                            });
                        }
                    }
                });
			}
		}
    },
    computed: {
        activeUser() {
            return this.$store.state.activeUser;
        },
        notes() {
            return this.$store.state.notes;
        },
        lists() {
            return this.$store.state.lists;
        }
    }
}
</script>

<style>
#login-view {
    margin: 3em auto;
    padding: 1em;
    max-width: 600px;
    position: relative;
    top: 5.6vh;
}
.login-text {
    font-size: 2rem;
    color: #fff;
}
.login-input {
    display: block;
    width: 100%;
    height: 2em;
    margin: 1em 0 1em 0;
    color: #fff;
    background: none;
    border: none;
    border-bottom: 1px solid #fff;
    font-size: 1.2rem;
}
.login-buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin: 2em 0 2em 0;
}
.login-submit {
    width: 6em;
    height: 2.5em;
    background-color: #5772e9;
    border: none;
    border-radius: 5px;
    font-size: 1.2rem;
    color: #fff;
}
.login-extras {
    display: grid;
    grid-template-rows: 1fr 1fr;
}
.login-extra {
    text-align: right;
    font-size: 1rem;
    text-decoration: none;
}
.login-extra:hover {
    color: #5772e9;
}
</style>