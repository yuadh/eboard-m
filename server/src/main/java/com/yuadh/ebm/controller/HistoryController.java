package com.yuadh.ebm.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.plugins.pagination.PageDTO;
import com.yuadh.ebm.annotation.AuthCheck;
import com.yuadh.ebm.common.BaseResponse;
import com.yuadh.ebm.common.ErrorCode;
import com.yuadh.ebm.common.ResultUtils;
import com.yuadh.ebm.exception.BusinessException;
import com.yuadh.ebm.model.dto.equipment.UpdateScrrenRequest;
import com.yuadh.ebm.model.dto.history.ConferenceQueryRequest;
import com.yuadh.ebm.model.dto.history.ConferenceStartRequest;
import com.yuadh.ebm.model.entity.Equipment;
import com.yuadh.ebm.model.entity.History;
import com.yuadh.ebm.model.entity.Room;
import com.yuadh.ebm.model.entity.User;
import com.yuadh.ebm.model.vo.ConferenceVO;
import com.yuadh.ebm.model.vo.NowRoomDataVO;
import com.yuadh.ebm.service.EquipmentService;
import com.yuadh.ebm.service.HistoryService;
import com.yuadh.ebm.service.RoomService;
import com.yuadh.ebm.service.UserService;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/history")
public class HistoryController {
    
    
    @Resource
    HistoryService historyService;
    @Resource
    EquipmentService equipmentService;
    @Resource
    RoomService roomService;
    @Resource
    UserService userService;
    
    // region会议流程

    /**
     * 开始会议
     * @param conferenceStart
     * @return
     */
    @AuthCheck(anyRole = {"admin","user","root"})
    @PostMapping("/create")
    public BaseResponse<Boolean> startConference(@RequestBody ConferenceStartRequest conferenceStart){
        if (conferenceStart == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }

        Boolean result = historyService.conferenceStart(conferenceStart);
        return ResultUtils.success(result);
    }

    /**
     * 结束会议
     * @param id
     * @return
     */
    @AuthCheck(anyRole = {"admin","user","root"})
    @PostMapping("/finish")
    public BaseResponse<Boolean> finishConference(@RequestParam int id){
        if (id <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"会议记录不存在");
        }
        Boolean result = historyService.conferenceFinish(new Timestamp(System.currentTimeMillis()), id);
        return ResultUtils.success(result);
    }

    /**
     * 根据管理员id 获取会议记录列表
     * @param id
     * @return
     */
    @AuthCheck(anyRole = {"admin","user","root"})
    @GetMapping("/get/adminId")
    public BaseResponse<List<ConferenceVO>> getListByAdminId(int id) {
        if (id <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"管理员不存在");
        }
        List<ConferenceVO> conferenceVOS = historyService.listHistoryByAdminId((long)id);
        if (conferenceVOS==null) {
            throw new BusinessException(ErrorCode.OPERATION_ERROR,"未查询到记录");
        }
        return ResultUtils.success(conferenceVOS);
    }

    /**
     * 通过会议室号 获取会议记录列表
     * @param id
     * @return
     */
    @AuthCheck(anyRole = {"admin","user","root"})
    @GetMapping("/get/roomId")
    public BaseResponse<List<ConferenceVO>> getListByRoomId(int id) {
        if (id <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"会议室不存在");
        }
        List<ConferenceVO> conferenceVOS = historyService.listHistoryByRoomId((long)id);
        if (conferenceVOS==null) {
            throw new BusinessException(ErrorCode.OPERATION_ERROR,"未查询到记录");
        }
        return ResultUtils.success(conferenceVOS);
    }

    
    
    

    /**
     * 获取当前会议室数据
     * @param id
     * @return
     */
    @AuthCheck(anyRole = {"admin","user","root"})
    @GetMapping("/get/now")
    public BaseResponse<NowRoomDataVO> getNowByRoomId(int id) {
        if (id <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"会议室不存在");
        }
        NowRoomDataVO nowRoomDataVO = new NowRoomDataVO();
        History history = historyService.getNowByRoomId((long)id);
        if (history==null) {
            nowRoomDataVO.setRoomName("");
            nowRoomDataVO.setId((long)0);
            nowRoomDataVO.setFlag(0);
        }else {
            nowRoomDataVO.setId(history.getId());
            nowRoomDataVO.setRoomName(history.getConferenceName());
            nowRoomDataVO.setFlag(1);
        }
        nowRoomDataVO.setInRoomEquipmenCount(equipmentService.getEquipmentCountByRoomId(id));
        nowRoomDataVO.setEquipmentCount(roomService.getEquipmentCount(id));
        
        return ResultUtils.success(nowRoomDataVO);
    }

    /**
     * 分页获取记录列表
     * @param conferenceQueryRequest
     * @return
     */
    @AuthCheck(anyRole = {"admin","user","root"})
    @GetMapping("/list/page")
    public BaseResponse<List<ConferenceVO>> listHistoryByPage(ConferenceQueryRequest conferenceQueryRequest){
        History historyQuery = new History();
        if (conferenceQueryRequest != null) {
            BeanUtils.copyProperties(conferenceQueryRequest,historyQuery);
        }
        QueryWrapper<History> qw = new QueryWrapper<>(historyQuery);
        List<History> historyList = historyService.list(qw);
        List<ConferenceVO> conferenceVOList = historyList.stream().map(history->{
            ConferenceVO conferenceVO = new ConferenceVO();
            BeanUtils.copyProperties(history,conferenceVO);
            Room room = roomService.getById(history.getRoomId());
            conferenceVO.setRoomName(room.getRoomName());
            User user = userService.getById(history.getUserId());
            conferenceVO.setUserName(user.getUserName());
            return conferenceVO;
        }).collect(Collectors.toList());
        
        return ResultUtils.success(conferenceVOList);
    }
}
