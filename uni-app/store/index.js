import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isLogin: false,
    userInfo: {},
  },
  mutations: {
    storeLogin(state, payload) {
      state.isLogin = true
      state.userInfo = payload
    },
    storeLogout(state, payload) {
      state.isLogin = false
      state.userInfo = {}
    },
  },
})

export default store
