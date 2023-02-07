package com.yuadh.ebm.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.yuadh.ebm.model.entity.Room;
import com.yuadh.ebm.model.vo.InRoomEquipmentVO;
import com.yuadh.ebm.model.vo.RoomVO;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
* @author yuadh
* @description 针对表【room(会议室表)】的数据库操作Mapper
* @createDate 2023-01-23 17:39:59
* @Entity generator.domain.Room
*/
public interface RoomMapper extends BaseMapper<Room> {

    /**
     * SQL-根据用户id查询 用户所加入的会议室
     * @param userId-用户id
     * @return 用户-会议室视图
     * select a.id,a.roomName,a.roomMsg,a.equipmentCount,a.adminId,a.roomStatus,a.createTime,a.updateTime
     * from room as a,room_into as b where a.id = b.roomId and b.user_id = #{userId} and a.isDelete = 0 and b.isDelete = 0
     */
    @Select("select a.id,a.roomName,a.roomMsg,a.equipmentCount,a.adminId,a.roomStatus,a.createTime,a.updateTime " +
            "from room as a,room_into as b where a.id = b.roomId and b.userId = #{userId} and a.isDelete = 0 and b.isDelete = 0")
    List<RoomVO> findByUserId(@Param("userId")Long userId);
    
    
    
}




