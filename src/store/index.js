import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    userId: '',
    userID: '',
    token: '',
    openId: ''
  },
  mutations: {
    setUserInfo(state, userInfo) {
      Object.keys(userInfo).forEach(key => {
        state[key] = userInfo[key];
        wx.setStorage({
          key,
          data: userInfo[key],
        });
      });
    },
  },
});

export default store;
