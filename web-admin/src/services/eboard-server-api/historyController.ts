// @ts-ignore
/* eslint-disable */
import request from '@/plugins/globalRequest';

/** startConference POST /api/history/create */
export async function startConferenceUsingPOST(
  body: API.ConferenceStartRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/history/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** finishConference POST /api/history/finish */
export async function finishConferenceUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.finishConferenceUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/history/finish', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getListByAdminId GET /api/history/get/adminId */
export async function getListByAdminIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getListByAdminIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListConferenceVO_>('/api/history/get/adminId', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getNowByRoomId GET /api/history/get/room/now */
export async function getNowByRoomIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getNowByRoomIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseNowRoomDataVO_>('/api/history/get/room/now', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getListByRoomId GET /api/history/get/roomId */
export async function getListByRoomIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getListByRoomIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListConferenceVO_>('/api/history/get/roomId', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listHistoryByPage GET /api/history/list/page */
export async function listHistoryByPageUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listHistoryByPageUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageConferenceVO_>('/api/history/list/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
