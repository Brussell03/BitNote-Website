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
			lists: false,
			calendar: false
		},
		notes: [],
		lists: [],
		defaultNoteData: { id: '', name: 'New Note', desc: 'Give further details... (Optional)', date: new Date(), shared: false, shareLink: '', sharedWith: ['Start'] },
		defaultListData: { id: '', name: 'New List', desc: 'Give further details...', type: 'Checklist', items: [ { id: '', name: 'First Item', checked: false } ], date: new Date(), shared: false, shareLink: '', sharedWith: ['Start'] },
		defaultItemData: { id: '', name: '', checked: false }
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