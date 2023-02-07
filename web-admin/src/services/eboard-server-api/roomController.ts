// @ts-ignore
/* eslint-disable */
import request from '@/plugins/globalRequest';

/** addRoom POST /api/room/create */
export async function addRoomUsingPOST(body: API.RoomAddRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseLong_>('/api/room/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteRoom POST /api/room/delete */
export async function deleteRoomUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/room/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getRoomById GET /api/room/get */
export async function getRoomByIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getRoomByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseRoomVO_>('/api/room/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getRoomsByAdminId GET /api/room/get/adminId */
export async function getRoomsByAdminIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getRoomsByAdminIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListRoomVO_>('/api/room/get/adminId', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getRoomsByUserId GET /api/room/get/userId */
export async function getRoomsByUserIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getRoomsByUserIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListRoomVO_>('/api/room/get/userId', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listEquipment GET /api/room/list */
export async function listEquipmentUsingGET1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listEquipmentUsingGET1Params,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListRoomVO_>('/api/room/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listEquipmentByPage GET /api/room/list/page */
export async function listEquipmentByPageUsingGET1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listEquipmentByPageUsingGET1Params,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageRoomVO_>('/api/room/list/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** updateRoom POST /api/room/update */
export async function updateRoomUsingPOST(
  body: API.RoomUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/room/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
