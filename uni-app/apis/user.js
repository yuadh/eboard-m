import Request from "@/utils/request/index.js"
let request = Request()

/**
 * 获取当前登录用户
 */
export function apiUserCurrent() {
  return request.request({
    url: "/user/current",
    method: "get",
  })
}
/**
 * 用户登录请求
 * @param {Object} data
 */
export function apiUserLogin(data) {
  return request.request({
    url: "/user/login",
    data: data,
    method: "post",
  })
}

/**
 * 退出当前用户
 */
export function apiUserLogout() {
  return request.request({
    url: "/user/logout",
    method: "post",
  })
}
