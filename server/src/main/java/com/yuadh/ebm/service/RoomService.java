package com.yuadh.ebm.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.yuadh.ebm.model.entity.Room;
import com.yuadh.ebm.model.vo.RoomVO;

import java.util.List;

/**
* @author yuadh
* @description 针对表【room(会议室表)】的数据库操作Service
* @createDate 2023-01-23 17:39:59
*/
public interface RoomService extends IService<Room> {

    /**
     * 更新或添加会议室
     * @param room
     * @return
     */
    Long updateRoom(Room room);

    /**
     * 根据会议室名称查询设备
     * @param roomName
     * @return
     */
    Room getRoomByName(String roomName);
    

    /**
     * 根据用户id，查询所在的会议室列表
     * @param userId
     * @return
     */
    List<RoomVO> listByUserId(Long userId);

    /**
     * 根据管理员Id,查询所管理的会议室列表
     * @param adminId
     * @return
     */
    List<RoomVO> listByAdminId(Long adminId);
    
    

    /**
     * 根据管理员id查询 是否有该会议室
     * @param roomId
     * @return
     */
    boolean isInRoom(Long roomId);

    /**
     * 根据会议室名称查询 是否有该会议室
     * @param roomName
     * @return
     */
    boolean isNameIn(String roomName);

    /**
     * 根据会议室号id 获取设备容量
     * @return
     */
    Integer getEquipmentCount(int roomId);

    /**
     * 根据管理员id，获取会议室数
     * @param adminId
     * @return
     */
    Long getRoomCount(int adminId);
}
