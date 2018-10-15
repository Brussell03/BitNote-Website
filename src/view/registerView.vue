<template>
    <div id="login-view">
        <h2 class="login-text">Register</h2>
        <div v-if="!submitted">
            <input class="login-input" type="text" placeholder="Username" v-model.lazy="userInput.username" required>
            <input class="login-input" type="password" placeholder="Password" v-model.lazy="userInput.password" required>
            <input class="login-input" type="password" placeholder="Confirm Password" v-model.lazy="userInput.confirmPassword" required>
            <input type="email" class="login-input" placeholder="Email" v-model.lazy="userInput.email">
            <button class="login-submit" @click="registerUser()">Register</button>
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
                confirmPassword: '',
                email: ''
            },
            submitted: false
        }
    },
    methods: {
        registerUser: function() {
            if(this.password === this.confirmPassword) {
                this.$http.get('https://bitnote-50e75.firebaseio.com/users.json').then(function(data) {
                    return data.json();
                }).then(function(data) {
                    for(let key in data) {
                        if(data[key].username === this.userInput.username) {
                            console.log('Username taken');
                        } else {
                            var newUser = { username: this.userInput.username, password: this.userInput.password, email: this.userInput.email, notes: [Object.assign({}, defaultNoteData)], lists: [ Object.assign({}, this.defaultListData) ] };
                            this.$http.post('https://bitnote-50e75.firebaseio.com/users.json', newUser).then(function(data) {
                                this.submitted = true;
                                this.activeUser.active = true;
                                this.activeUser.id = data.date.name;
                                this.activeUser.name = this.userInput.username;
                                this.activeUser.password = this.userInput.password;
                                this.activeUser.email = this.userInput.email;
                                this.submitted = true;
                                this.getNotes();
                                this.getLists();
                                this.$router.push('/dashboard');
                            });
                        }
                    }
                });
            } else {

            }
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
        defaultNoteData() {
            return this.$store.state.defaultNoteData;
        },
        defaultListData() {
            return this.$store.state.defaultListData;
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
</style>
