import { createStore } from 'vuex';
import { notification } from 'ant-design-vue';
const store = createStore({
	state: {
		toke: sessionStorage.getItem('toke'),
		user: null,
	},
	getters: {
		toke: ({ toke }) => toke,
		user: ({ user }) => user,
	},
	mutations: {
		setToke: (state, val) => (state.toke = val),
		setUser: (state, val) => (state.user = val),
	},
	actions: {
		initAppData: ({ commit }, { toke, user }) => {
			sessionStorage.setItem('toke', toke);
			commit('setToke', toke);
			commit('setUser', user);
			notification.open({
				message: '欢迎语',
				description: `欢迎回来：${user.name}`,
			});
		},
		resetAppData: ({ commit }) => {
			sessionStorage.removeItem('toke');
			commit('setToke', null);
			commit('setUser', null);
		},
	},
});

export default store;
