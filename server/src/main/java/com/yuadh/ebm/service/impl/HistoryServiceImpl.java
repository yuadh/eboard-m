package com.yuadh.ebm.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.yuadh.ebm.common.ErrorCode;
import com.yuadh.ebm.exception.BusinessException;
import com.yuadh.ebm.mapper.UserMapper;
import com.yuadh.ebm.model.dto.history.ConferenceStartRequest;
import com.yuadh.ebm.model.entity.History;
import com.yuadh.ebm.model.vo.ConferenceVO;
import com.yuadh.ebm.model.vo.HistoryCountVO;
import com.yuadh.ebm.service.HistoryService;
import com.yuadh.ebm.mapper.HistoryMapper;
import com.yuadh.ebm.service.RoomService;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

/**
* @author yuadh
* @description 针对表【history(会议记录表)】的数据库操作Service实现
* @createDate 2023-01-23 10:17:21
*/
@Service
public class HistoryServiceImpl extends ServiceImpl<HistoryMapper, History>
    implements HistoryService{
    @Resource
    HistoryMapper historyMapper;
    @Resource
    RoomService roomService;
    @Resource
    UserMapper userMapper;
    
    @Override
    public List<ConferenceVO> listHistoryByAdminId(Long adminId) {
        if (adminId<=0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"管理员不存在");
        }
        return historyMapper.findByAdminId(adminId);
    }

    @Override
    public List<ConferenceVO> listHistoryByRoomId(Long roomId) {
        if (roomId<=0||!roomService.isInRoom(roomId)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"会议室不存在");
        }
        return historyMapper.findByRoomId(roomId);
    }

    @Override
    public Boolean conferenceStart(ConferenceStartRequest conferenceStart) {
        Long roomId = conferenceStart.getRoomId();
        String conferenceName = conferenceStart.getConferenceName();
        Date finishTime = conferenceStart.getFinishTime();
        Integer isFinish = conferenceStart.getIsFinish();
        Long userId = conferenceStart.getUserId();
        if (userId<=0 || userMapper.selectById(userId)==null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"用户不存在");
        }
        if (this.getNowByRoomId(roomId)!=null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"会议已存在");
        }
        if (conferenceName.length()<4||conferenceName.length()>1024) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"会议名称有误");
        }
        if (finishTime!=null || isFinish!=0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"会议创建出错");
        }
        synchronized (conferenceName.intern()){
            History history = new History();
            BeanUtils.copyProperties(conferenceStart,history);
            int result = historyMapper.insert(history);
            if (result>0) {
                return true;
            }
        }
        return false;
    }

    @Override
    public Boolean conferenceFinish(Timestamp timestamp, int id) {
        if (timestamp==null||id<=0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"会议结束出错");
        }
        QueryWrapper<History> qw = new QueryWrapper<>();
        qw.eq("id",id);
        qw.eq("isFinish",0);
        qw.isNull("finishTime");

        History history = historyMapper.selectOne(qw);
        if (history!=null) {
            historyMapper.conferenceFinish(timestamp,id);
            return true;
        }
        return false;
    }

    @Override
    public History getNowByRoomId(Long roomId) {
        if (roomId<=0||!roomService.isInRoom(roomId)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"会议室不存在");
        }
        QueryWrapper<History> qw = new QueryWrapper<>();
        
        qw.eq("roomId",roomId);
        qw.eq("isFinish",0);
        qw.isNull("finishTime");
        
        return historyMapper.selectOne(qw);
    }

    @Override
    public History getNowByUserId(Long userId) {
        if (userId<=0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"用户不存在");
        }
        QueryWrapper<History> qw = new QueryWrapper<>();

        qw.eq("userId",userId);
        qw.eq("isFinish",0);
        qw.isNull("finishTime");
        
        return historyMapper.selectOne(qw);
    }

    @Override
    public Long getHistoryCountByAdminId(int adminId) {
        QueryWrapper<History> qw = new QueryWrapper<>();
        if (adminId==0) {
            qw.eq("isDelete",0);
            return historyMapper.selectCount(qw);
        }
        Long result = (long)historyMapper.getHistoryByAdminId(adminId);
        return result;
    }

    @Override
    public List<HistoryCountVO> getMouthData(int adminId) {
        if (adminId==0) {
            return  historyMapper.getMouthData();
        }
        return historyMapper.getMouthDataByAdminId(adminId);
    }
}




