import Vue from 'vue';
import Vuex from 'vuex';

import { fetchLoggedInUser } from '@/services/auth';

Vue.use(Vuex);
interface GlobalState {
  loggedInUser: LoggedInUser;
}

export default new Vuex.Store<GlobalState>({
  state: {
    loggedInUser: {
      userName: '',
      userId: '',
      provider: '',
    },
  },
  mutations: {
    setGithubUser(state, userInfo) {
      const { userId, userName } = userInfo;
      state.loggedInUser.provider = 'github';
      state.loggedInUser.userId = userId;
      state.loggedInUser.userName = userName;
    },
  },
  actions: {
    fetchLoggedInUser: async ({ commit }) => {
      try {
        const userInfo = await fetchLoggedInUser();
        commit('setGithubUser', userInfo);
      } catch (e) {
        console.error(e);
      }
    },
  },
  modules: {
  },
});
