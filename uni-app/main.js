import App from "./App"

// #ifndef VUE3
import Vue from "vue"
import Vuex from "vuex"
import store from "./store/index.js"
Vue.prototype.$store = store
Vue.config.productionTip = false
// 引入js处理函数
import PubFuc from "./common/js/utils.js"
Vue.prototype.$pubFuc = PubFuc
import uView from "@/uni_modules/uview-ui"
Vue.use(uView)
App.mpType = "app"
const app = new Vue({
  ...App,
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from "vue"
export function createApp() {
  const app = createSSRApp(App)
  return {
    app,
  }
}
// #endif
