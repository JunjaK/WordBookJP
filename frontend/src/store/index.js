import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {
      accessToken: localStorage.getItem('accessToken'),
      nickname: localStorage.getItem('nickname'),
      userId: localStorage.getItem('userId'),
    },
  },
  mutations: {
    getToken(state) {
      state.userInfo.accessToken = localStorage.getItem('accessToken');
      state.userInfo.nickname = localStorage.getItem('nickname');
      state.userInfo.userId = localStorage.getItem('userId');
    },
    delToken(state) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('nickname');
      localStorage.removeItem('userId');
      state.userInfo.accessToken = null;
      state.userInfo.nickname = null;
      state.userInfo.userId = null;
      window.location.replace('/signin');
    },
  },
  getters: {
    getAccessToken: (state) => state.userInfo.accessToken,
    getNickname: (state) => state.userInfo.nickname,
    getUserId: (state) => state.userInfo.userId,
  },
  actions: {
    commitGetToken: (context) => context.commit('getToken'),
    commitDelToken: (context) => context.commit('delToken'),
  },
  modules: {
  },
});
