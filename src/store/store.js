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
			list: false,
			calendar: false
		},
		notes: [],
		defaultNoteData: { id: '', name: 'New Note', desc: 'Give further details... (Optional)', date: new Date(), shared: false, shareLink: '', sharedWith: ['Start'] },
		defaultListData: { id: '', name: 'New List', desc: '', items: [], date: new Date(), shared: false, shareLink: '', sharedWith: [] },
		defaultListItem: { id: '', name: '', checked: false }
	},
	mutations: {
		logout(state) {
			state.activeUser.active = false;
		}
	},
	actions: {
		logout ({ commit }) {
			commit('logout');
		}
	}
});