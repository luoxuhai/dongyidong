import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    userId: '',
    token: '',
    openId: '',
    avatarUrl: '',
    city: '',
    school: '',
    userSno: '',
    nickName: '',
    province: '',
    gender: '',
    phoneNumber: '',
    load: false,
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
    setLoadState(state, status) {
      state.load = status;
    },
  },
});

export default store;
