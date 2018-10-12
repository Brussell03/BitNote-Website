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
    props: {
        activeUser: {
            type: Object,
            required: true
        }
    },
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
                            });
                        }
                    }
                });
            } else {

            }
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
.login-submit {
    width: 6em;
    height: 2.5em;
    background-color: #5772e9;
    border: none;
    border-radius: 5px;
    font-size: 1.2rem;
    margin: 2em 0 2em 0;
}
</style>