import { Module } from 'vuex';

export interface LoginUser {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  providerId: string;
}

const firebaseModule: Module<{ user: LoginUser }, any> = {
  namespaced: true,
  state: () => ({
    user: {
      displayName: '',
      email: '',
      photoURL: '',
      providerId: '',
      uid: '',
    },
  }),
  mutations: {
    setLoginUser(state, user) {
      state.user = user;
    },
  },
};

export default firebaseModule;
