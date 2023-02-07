import Request from '@/utils/request/index.js'
let request = Request()

/**
 * 获取会议室
 */
export function  apiUserRooms(data){
  return request.request({
    url:'/room/get/userId?userId='+data,
    method:'get'
  })
}

/**
 * 添加会议室
 * @param {Object} data- roomName、roomPassword、userId
 */
export function  apiAddRoom(data){
  return request.request({
    url:'/into/create',
    data:data,
    method:'post'
  })
}
/**
 * 删除会议室
 * @param {Object} data-roomId、UserId
 */
export function  apiRemoveRoom(data){
  return request.request({
    url:'/into/delete',
    data:data,
    method:'post'
  })
}

/**
 * 进入会议室，获取会议室设备
 * @param {Object} data
 */
export function  apiIntoRoom(data){
  return request.request({
    url:'/equipment/get/roomid',
    data:data,
    method:'get'
  })
}

/**
 * 获取会议室当前状态
 * @param {Object} data
 */
export function  apiGetRoomNow(data){
  return request.request({
    url:'/history/get/now',
    data:data,
    method:'get'
  })
}

/**
 * 开始会议
 * @param {Object} data - confrenceName、roomId、userId
 */
export function  apiStartConference(data){
  return request.request({
    url:'/history/create',
    data:data,
    method:'post'
  })
}

/**
 * 结束会议
 * @param {Object} data - roomId
 */
export function  apiFinishConference(data){
  return request.request({
    url:'/history/finish?id='+data,
    method:'post'
  })
}

/**
 * 根据id获取设备信息
 * @param {Object} data
 */
export function  apiGetEquipment(data){
  return request.request({
    url:'/equipment/get?id='+data,
    method:'get'
  })
}

/**
 * 更新设备信息
 * @param {Object} data
 */
export function  apiChangeEquipment(data){
  return request.request({
    url:'/equipment/update',
    data:data,
    method:'post'
  })
}

export function  apiChangeScreen(data){
  return request.request({
    url:'/equipment/update/screen',
    data:data,
    method:'post'
  })
}
