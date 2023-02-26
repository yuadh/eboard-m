const EBOARD_USER_COOKIE = "eboard-user-cookie"

/**
 * 设置用户的登录态
 */
export const setUserLoginState = (userCookie) => {
  let cookieObj = {
    data: userCookie,
    time: Date.now(),
    storageTime: 604800,
  }
  uni.setStorageSync(EBOARD_USER_COOKIE, cookieObj)
}

/**
 * 获取用户的登录态
 */
export const getUserLoginState = () => {
  let cookieObj = uni.getStorageSync(EBOARD_USER_COOKIE || "{}")

  if (Date.now() - cookieObj.time > cookieObj.storageTime) {
    uni.removeStorageSync(EBOARD_USER_COOKIE)
    return null
  }
  return cookieObj.data
}

/**
 * 清除用户的登录态
 */
export const clearUserLoginState = () => {
  uni.removeStorageSync(EBOARD_USER_COOKIE)
}

/**
 * 判断是否登录
 */
export const isLogin = () => {
  return !!getUserLoginState()
}
