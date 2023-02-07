package com.yuadh.ebm.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.yuadh.ebm.model.entity.Equipment;
import com.yuadh.ebm.model.vo.InRoomEquipmentVO;

import java.util.List;

/**
* @author yuadh
* @description 针对表【equipment(设备表)】的数据库操作Service
* @createDate 2023-01-23 17:39:52
*/
public interface EquipmentService extends IService<Equipment> {
    /**
     * 更新设备
     * @param equipment - equipment
     * @return - equip
     */
    long updataEquip(Equipment equipment);

    /**
     * 根据条件获取设备列表信息
     * @param hasRoom - false-未加入会议室 true-已加入会议室
     * @param adminId - 0-获取以加入会议室的所有设备列表 adminId>0-获取已在会议室并根据管理员id获取设备列表
     * @return - equipVo
     */
    List<InRoomEquipmentVO> getAllByConditions(boolean hasRoom, int adminId);

    /**
     * 根据会议室号 统计设备数
     * @return
     */
    Integer getEquipmentCountByRoomId(int roomId);

    Long getEquipCountByAdminId(int adminId);
    
    /**
     * 根据设备编码 设置IP
     * @param equipmentCode
     * @param ip
     * @return
     */
    Boolean setIp(String equipmentCode,String ip);
}
