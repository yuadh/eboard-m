package com.yuadh.ebm.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.yuadh.ebm.model.entity.Equipment;
import com.yuadh.ebm.model.vo.InRoomEquipmentVO;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

/**
* @author yuadh
* @description 针对表【equipment(设备表)】的数据库操作Mapper
* @createDate 2023-01-23 17:39:52
* @Entity generator.domain.Equipment
*/
public interface EquipmentMapper extends BaseMapper<Equipment> {
    /**
     * SQL-根据管理员id查询未被删除的设备
     * @param adminId-管理员id
     * @return 设备-会议室视图
     */
    @Select("select a.id,a.equipmentCode,a.equipmentMsg,a.equipmentScreen,a.equipmentIp,b.roomName,a.equipmentStatus,a.createTime,a.updateTime from " +
            "equipment  as a , room as b where a.roomId = b.id and  a.roomId != 0 and a.isDelete=0 and b.userId = #{adminId}")
    List<InRoomEquipmentVO> getListByAdminId(@Param("adminId")int adminId);

    /**
     * SQL-查询在会议室中的所有设备
     * @return
     */
    @Select("select a.id,a.equipmentCode,a.equipmentMsg,a.equipmentScreen,a.equipmentIp,b.roomName,a.equipmentStatus,a.createTime,a.updateTime from " +
            "equipment  as a , room as b where a.roomId = b.id and  a.roomId != 0 and a.isDelete=0")
    List<InRoomEquipmentVO> getListInRoom();

    
    /**
     * 查询该管理员下在会议室内且没被删除的设备数
     */
    @Select("SELECT count(*) from equipment as a,room as b where a.roomId = b.id and b.adminId= #{id} and a.isDelete = 0")
    Integer getEquipmentCountByAdminId(@Param("id") Integer id);
    

    /**
     * 根据设备编码修改IP信息
     * @param ip
     * @param code
     */
    @Update("update equipment set equipmentIp = #{ip} where equipmentCode = #{code}")
    void setIp(@Param("ip")String ip,@Param("code")String code);
    
}




