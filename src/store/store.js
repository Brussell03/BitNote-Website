import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		activeUser: {
			active: false,
			username: '',
			password: '',
			id: '',
			email: ''
		},
		activeView: {
			dashboard: false,
			notes: true,
			planner: false,
			groups: false,
			calendar: false
		},
		notes: [],
		defaultNoteData: { id: '', name: 'New Note', desc: 'Give further details... (Optional)', date: new Date(), shared: false, shareLink: '' }
	},
	mutations: {
		logout(state) {
			state.activeUser.active = false;
		},
		getNotes(state) {
			if(this.state.activeUser.active) {
				this.notes = [];
				this.$http.get('https://bitnote-50e75.firebaseio.com/users/' + this.activeUser.id + '/notes.json').then(function(data) {
					return data.json();
				}).then(function(data) {
					var i = 0
					for(let key in data) {
						this.notes.push(data[key]);
						this.notes[i].id = key;
						i++;
						console.log(this.notes[i].id);
					}
				});
				for(var i = 0; i < this.notes.length; i++) {
					if(this.notes[i].shared === true) {
						this.$http.get(this.notes[i].shareLink).then(function(data) {
							return data.json();
						}).then(function(data) {
							var temp = this.notes[i].shareLink;
							this.notes[i] = data;
							this.notes[i].shared = true;
							this.notes[i].shareLink = temp;
						});
					}
				}
			}
		},
		newNote(state) {
			
		},
		setIds(state) {
			console.log('-setIds-');
			this.$http.get('https://bitnote-50e75.firebaseio.com/users/' + this.activeUser.id + '/notes.json').then(function(data) {
				return data.json();
			}).then(function(data) {
				var i = 0
				for(let key in data) {
					this.notes[i].id = key;
					i++;
				}
			});
		}
	},
	actions: {
		getNotes ({ commit }) {
			commit('getNotes');
		},
		logout ({ commit }) {
			commit('logout');
		},
		newNote ({ commit }) {

			commit('newNote');
		},
		setIds ({ commit }) {
			commit('setIds');
		}
	}
});