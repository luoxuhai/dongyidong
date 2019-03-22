import Vue from "vue"
import Vuex from "vuex"
import {
  userState,
  userMutations
} from "./user"
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    ...userState
  },
  mutations: {
    ...userMutations
  }
})

export default store
