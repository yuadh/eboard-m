// @ts-ignore
/* eslint-disable */
import request from '@/plugins/globalRequest';

/** addEquipment POST /api/equipment/create */
export async function addEquipmentUsingPOST(
  body: API.EquipmentAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/equipment/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteEquipment POST /api/equipment/delete */
export async function deleteEquipmentUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/equipment/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getEquipmentById GET /api/equipment/get */
export async function getEquipmentByIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getEquipmentByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseEquipmentVO_>('/api/equipment/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getListByConditions GET /api/equipment/get/conditions */
export async function getListByConditionsUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getListByConditionsUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListInRoomEquipmentVO_>('/api/equipment/get/conditions', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getEquipmentByRoomId GET /api/equipment/get/roomid */
export async function getEquipmentByRoomIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getEquipmentByRoomIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListEquipmentVO_>('/api/equipment/get/roomid', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listEquipment GET /api/equipment/list */
export async function listEquipmentUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listEquipmentUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListEquipmentVO_>('/api/equipment/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listEquipmentByPage GET /api/equipment/list/page */
export async function listEquipmentByPageUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listEquipmentByPageUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageEquipmentVO_>('/api/equipment/list/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** updateEquipment POST /api/equipment/update */
export async function updateEquipmentUsingPOST(
  body: API.EquipmentUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/equipment/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
