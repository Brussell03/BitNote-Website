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
		}
	}
});