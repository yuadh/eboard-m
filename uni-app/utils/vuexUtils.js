import store from "../store/index.js"
import { apiUserCurrent } from "../apis/user.js"

export const getCurrentUser = async () => {
  // 获取当前登录信息，保存至vue
  try {
    let res = await apiUserCurrent()

    if (res.data.code == "0") {
      store.commit("storeLogin", res.data.data)
    } else {
      uni.navigateTo({
        url: "/pages/login/index",
      })
    }
  } catch (e) {}
}
