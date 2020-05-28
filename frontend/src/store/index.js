import Vue from 'vue';
import Vuex from 'vuex';
import moment from 'moment';
import axios from 'axios';

const apiRootPath = process.env.NODE_ENV !== 'production'
  ? 'http://localhost:8000/api/'
  : '/api/';
axios.defaults.baseURL = apiRootPath;

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {
      accessToken: localStorage.getItem('accessToken'),
      refreshToken: localStorage.getItem('refreshToken'),
      expiryDtime: localStorage.getItem('expiryDtime'),
      userName: localStorage.getItem('userName'),
      profileIMG: localStorage.getItem('profileIMG'),
    },
  },
  mutations: {
    getToken(state) {
      state.userInfo.accessToken = localStorage.getItem('accessToken');
      state.userInfo.refreshToken = localStorage.getItem('refreshToken');
      state.userInfo.expiryDtime = localStorage.getItem('expiryDtime');
      state.userInfo.userName = localStorage.getItem('userName');
      state.userInfo.profileIMG = localStorage.getItem('profileIMG');
    },
    delToken(state) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('expiryDtime');
      localStorage.removeItem('userName');
      localStorage.removeItem('profileIMG');
      state.userInfo.accessToken = null;
      state.userInfo.refreshToken = null;
      state.userInfo.expiryDtime = null;
      state.userInfo.userName = null;
      state.userInfo.profileIMG = null;
      window.location.replace('/signin');
    },
  },
  getters: {
    getAccessToken: (state) => state.userInfo.accessToken,
    getRefreshToken: (state) => state.userInfo.refreshToken,
    getExpiryDtime: (state) => state.userInfo.expiryDtime,
    getUserName: (state) => state.userInfo.userName,
    getProfileIMG: (state) => state.userInfo.profileIMG,
  },
  actions: {
    commitGetToken: (context) => context.commit('getToken'),
    commitDelToken: (context) => context.commit('delToken'),
    checkTokenVeri: (context) => {
      const requestRefreshToken = {
        grantType: 'REFRESH_TOKEN',
        refreshToken: context.getters.getRefreshToken,
      };
      const remainTime = context.getters.getExpiryDtime
        - moment()
          .valueOf()
          .toString();
      console.log(remainTime);
      if (remainTime < 500000) {
        return axios
          .get('/mypage/profile', {
            headers: { 'X-AUTH-TOKEN': context.getters.getAccessToken },
          })
          .then((r) => {
            requestRefreshToken.username = r.data.id;
            return axios.post('/auth/token', requestRefreshToken, {
              headers: { 'X-AUTH-TOKEN': context.getters.getAccessToken },
            });
          })
          .then((r) => {
            localStorage.setItem('accessToken', r.data.accessToken);
            localStorage.setItem('refreshToken', r.data.refreshToken);
            localStorage.setItem('expiryDtime', r.data.expiryDtime);
            return context.commit('getToken');
          })
          .catch((e) => {
            console.log(e);
            return context.commit('delToken');
          });
      }
      return null;
    },
  },
  modules: {
  },
});
