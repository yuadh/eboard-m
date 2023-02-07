// @ts-ignore
/* eslint-disable */
import request from '@/plugins/globalRequest';

/** 获取当前的用户 GET /api/user/current */
export async function currentUser(options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.CurrentUser>>('/api/user/current', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/user/logout */
export async function outLogin(options?: { [key: string]: any }) {
  return request<API.BaseResponse<number>>('/api/user/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/user/login */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.LoginResult>>('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 注册接口 POST /api/user/register */
export async function register(body: API.RegisterParams, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.RegisterResult>>('/api/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除用户 POST /api/user/delete */
export async function deleteUser(body:API.DeleteParams,options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.DeleteResponse>>('/api/user/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 添加用户 POST /api/user/create */
export async function addUser(body:API.AddUserParams,options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.DeleteResponse>>('/api/user/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}


/** 根据id查询用户 GET /api/user/create */
export async function getUserById(body:API.getUserByIdParams,options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.CurrentUser>>('/api/user/get', {
    method: 'GET',
    params: body,
    ...(options || {}),
  });
}


/** 更新用户 POST /api/user/update */
export async function updateUser(body:API.UserUpdateRequest,options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.UpdateUserResponse>>('/api/user/update', {
    method: 'POST',
    data:body,
    ...(options || {}),
  });
}

/** 根据id查询用户初始化模型 GET /api/user/init */
export async function getUserInitVO(body:API.getUserByIdParams,options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.InitVO>>('/api/user/init', {
    method: 'GET',
    params: body,
    ...(options || {}),
  });
}





/** 搜索用户 GET /api/user/list */
export async function searchUsers(body:API.CurrentUser,options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.CurrentUser[]>>('/api/user/list', {
    method: 'GET',
    params:body,
    ...(options || {}),
  });
}






/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}
