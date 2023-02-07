// @ts-ignore
/* eslint-disable */
import request from '@/plugins/globalRequest';

/** intoRoom POST /api/into/create */
export async function intoRoomUsingPOST(
  body: API.IntoAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/into/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** quiteRoom POST /api/into/delete */
export async function quiteRoomUsingPOST(
  body: API.IntoQuiteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/into/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listRoomInto GET /api/into/list */
export async function listRoomIntoUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listRoomIntoUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListRoomIntoVO_>('/api/into/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listRoomIntoByPage GET /api/into/list/page */
export async function listRoomIntoByPageUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listRoomIntoByPageUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageRoomIntoVO_>('/api/into/list/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
