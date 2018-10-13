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
                            var newUser = { username: this.userInput.username, password: this.userInput.password, email: '', notes: [{ name: 'First Note', desc: 'Make this your first note!' }], groups: [{ name: 'First Group', desc: 'Make this your first group!' }] };
                            this.$http.post('https://bitnote-50e75.firebaseio.com/users.json', newUser).then(function(data) {
                                this.submitted = true;
                                this.activeUser.active = true;
                                this.activeUser.id = data.date.name;
                                this.activeUser.name = this.userInput.username;
                                this.activeUser.password = this.userInput.password;
                                this.activeUser.email = this.userInput.email;
                            });
                        }
                    }
                });
            } else {

            }
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
</style>