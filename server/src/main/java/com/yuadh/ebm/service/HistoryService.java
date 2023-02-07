package com.yuadh.ebm.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.yuadh.ebm.model.dto.history.ConferenceStartRequest;
import com.yuadh.ebm.model.entity.History;
import com.yuadh.ebm.model.vo.ConferenceVO;
import com.yuadh.ebm.model.vo.HistoryCountVO;

import java.sql.Timestamp;
import java.util.List;

/**
* @author yuadh
* @description 针对表【history(会议记录表)】的数据库操作Service
* @createDate 2023-01-23 10:17:21
*/
public interface HistoryService extends IService<History> {
    /**
     * 根据管理员ID查询所有会议历史记录
     * @param adminId
     * @return
     */
    List<ConferenceVO> listHistoryByAdminId(Long adminId);

    /**
     * 根据房间id获取所有历史记录
     * @param roomId
     * @return
     */
    List<ConferenceVO> listHistoryByRoomId(Long roomId);

    /**
     * 根据id,结束会议
     * @param conferenceStart
     * @return
     */
    Boolean conferenceStart(ConferenceStartRequest conferenceStart );

    /**
     * 开始会议
     * @param timestamp
     * @param id
     * @return
     */
    Boolean conferenceFinish(Timestamp timestamp,int id);

    /**
     * 根据会议室id，获取正在进行的会议
     * @param roomId
     * @return
     */
    History getNowByRoomId(Long roomId);

    /**
     * 根据用户id，获取正在进行的会议
     * @param userId 
     * @return
     */
    History getNowByUserId(Long userId);

    /**
     * 根据管理员id，获取历史记录总数
     * @param adminId
     * @return
     */
    Long getHistoryCountByAdminId(int adminId);

    /**
     * 根据管理员ID查询，近一个月中开会数据
     * @return
     */
    List<HistoryCountVO> getMouthData(int adminId);
}
