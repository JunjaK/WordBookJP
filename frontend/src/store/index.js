import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {
      accessToken: localStorage.getItem('accessToken'),
      nickname: localStorage.getItem('nickname'),
    },
  },
  mutations: {
    getToken(state) {
      state.userInfo.accessToken = localStorage.getItem('accessToken');
      state.userInfo.nickname = localStorage.getItem('nickname');
    },
    delToken(state) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('nickname');
      state.userInfo.accessToken = null;
      state.userInfo.nickname = null;
      window.location.replace('/signin');
    },
  },
  getters: {
    getAccessToken: (state) => state.userInfo.accessToken,
    getnickname: (state) => state.userInfo.nickname,
  },
  actions: {
    commitGetToken: (context) => context.commit('getToken'),
    commitDelToken: (context) => context.commit('delToken'),
  },
  modules: {
  },
});
