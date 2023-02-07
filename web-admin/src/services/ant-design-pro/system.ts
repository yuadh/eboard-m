// @ts-ignore
/* eslint-disable */
import request from '@/plugins/globalRequest';

/** 搜索历史记录 GET /api/history/list/page */
export async function searchHistorys(body:API.listHistoryParams,options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.historyData[]>>('/api/history/list/page', {
    method: 'GET',
    params:body,
    ...(options || {}),
  });
}

/** 设备列表 GET /api/history/list/page */
export async function getEquipmentById(body:API.equipmentParams,options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.EquipmentVO>>('/api/equipment/get', {
    method: 'GET',
    params:body,
    ...(options || {}),
  });
}


/** 设备列表 GET /api/history/list/page */
export async function listEquipment(body:API.listEquipmentParams,options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.EquipmentVO[]>>('/api/equipment/list', {
    method: 'GET',
    params:body,
    ...(options || {}),
  });
}


/** 添加设备 POST /api/history/list/page */
export async function addEquipment(body:API.EquipmentAddRequest,options?: { [key: string]: any }) {
  return request<API.BaseResponse<number>>('/api/equipment/create', {
    method: 'POST',
    data:body,
    ...(options || {}),
  });
}

/** 删除设备 POST /api/history/list/page */
export async function deleteEquipment(body:API.DeleteRequest,options?: { [key: string]: any }) {
  return request<API.BaseResponse<boolean>>('/api/equipment/delete', {
    method: 'POST',
    data:body,
    ...(options || {}),
  });
}

/** 更新设备 POST /api/history/list/page */
export async function updateEquipment(body:API.EquipmentUpdateRequest,options?: { [key: string]: any }) {
  return request<API.BaseResponse<number>>('/api/equipment/update', {
    method: 'POST',
    data:body,
    ...(options || {}),
  });
}


/** 房间列表 GET /api/history/list/page */
export async function listRoom(body:API.listRoomParams,options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.RoomVO[]>>('/api/room/list', {
    method: 'GET',
    params:body,
    ...(options || {}),
  });
}

/** 添加会议室 POST /api/history/list/page */
export async function addRoom(body:API.RoomAddRequest,options?: { [key: string]: any }) {
  return request<API.BaseResponse<number>>('/api/room/create', {
    method: 'POST',
    data:body,
    ...(options || {}),
  });
}

/** 更新会议室 POST /api/history/list/page */
export async function updateRoom(body:API.RoomUpdateRequest,options?: { [key: string]: any }) {
  return request<API.BaseResponse<number>>('/api/room/update', {
    method: 'POST',
    data:body,
    ...(options || {}),
  });
}

/** 删除会议室 POST /api/history/list/page */
export async function deleteRoom(body:API.DeleteRequest,options?: { [key: string]: any }) {
  return request<API.BaseResponse<boolean>>('/api/room/delete', {
    method: 'POST',
    data:body,
    ...(options || {}),
  });
}

/** 获取会议室 GET /api/history/list/page */
export async function getRoomById(body:API.roomParams,options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.RoomVO>>('/api/room/get', {
    method: 'GET',
    params:body,
    ...(options || {}),
  });
}