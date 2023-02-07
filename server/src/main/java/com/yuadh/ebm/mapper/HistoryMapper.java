package com.yuadh.ebm.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.yuadh.ebm.model.entity.History;
import com.yuadh.ebm.model.vo.ConferenceVO;
import com.yuadh.ebm.model.vo.HistoryCountVO;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.sql.Timestamp;
import java.util.List;

/**
* @author yuadh
* @description 针对表【history(会议记录表)】的数据库操作Mapper
* @createDate 2023-01-23 10:17:21
* @Entity generator.domain.History
*/
public interface HistoryMapper extends BaseMapper<History> {
    /**
     * SQL-根据管理员id查询 所管理会议室的所有历史记录
     * @param adminId-管理员id
     * @return 会议记录视图
     */
    @Select("select a.id,a.conferenceName,b.roomName,a.roomId,a.userId, a.isFinish, a.createTime,a.finishTime " +
            "from history as a ,room as b where a.roomId = b.id and b.adminId = #{adminId} and a.isDelete = 0 and b.isDelete = 0")
    List<ConferenceVO> findByAdminId(@Param("adminId")Long adminId);

    /**
     * SQL-根据会议室号，查询该会议室下的所有历史记录
     * @param roomId-管理员id
     * @return 会议记录视图
     */
    @Select("select a.id,a.conferenceName,b.roomName,a.roomId,a.userId, a.isFinish, a.createTime,a.finishTime " +
            "from history as a ,room as b where a.roomId = b.id and a.roomId = #{roomId} and a.isDelete = 0 and b.isDelete = 0")
    List<ConferenceVO> findByRoomId(@Param("roomId")Long roomId);

    /**
     * 完成会议
     * @param finishTime
     * @param id
     */
    @Update("update history set finishTime = #{finishTime},isFinish=1 where id = #{id}")
    void conferenceFinish(@Param("finishTime") Timestamp finishTime, @Param("id") int id);

    /**
     * 根据管理员ID查询会议记录
     * @param adminId
     * @return
     */
    @Select("select count(*) from history as a,room as b where a.roomId = b.id and b.adminId=#{adminId} and a.isDelete = 0")
    Integer getHistoryByAdminId(@Param("adminId") Integer adminId);
    

    /**
     * 查看30天的开会记录
     * @return
     */
    @Select("select date(createTime) as date,count(id) as count from history " +
            " where DATE_SUB(CURDATE(), INTERVAL 30 DAY) <= date(createTime) group by date(createTime)")
    List<HistoryCountVO> getMouthData();

    
    @Select("select date(history.createTime) as date,count(history.id) as count from history ,room " +
            "where history.roomId = room.id and room.adminId=#{adminId}  and  DATE_SUB(CURDATE(), INTERVAL 30 DAY) <= date(history.createTime) group by date(history.createTime)")
    List<HistoryCountVO> getMouthDataByAdminId(@Param("adminId") Integer adminId);
}




