package com.yuadh.ebm.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.plugins.pagination.PageDTO;
import com.yuadh.ebm.annotation.AuthCheck;
import com.yuadh.ebm.common.BaseResponse;
import com.yuadh.ebm.common.DeleteRequest;
import com.yuadh.ebm.common.ErrorCode;
import com.yuadh.ebm.common.ResultUtils;
import com.yuadh.ebm.exception.BusinessException;
import com.yuadh.ebm.model.dto.room.RoomAddRequest;
import com.yuadh.ebm.model.dto.room.RoomQueryRequest;
import com.yuadh.ebm.model.dto.roomInto.IntoAddRequest;
import com.yuadh.ebm.model.dto.roomInto.IntoQueryRequest;
import com.yuadh.ebm.model.dto.roomInto.IntoQuiteRequest;
import com.yuadh.ebm.model.entity.Room;
import com.yuadh.ebm.model.entity.RoomInto;
import com.yuadh.ebm.model.vo.RoomIntoVO;
import com.yuadh.ebm.model.vo.RoomVO;
import com.yuadh.ebm.service.RoomIntoService;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/into")
public class RoomIntoController {
    @Resource
    RoomIntoService roomIntoService;
    
    //增删改查
    /**
     * 进入会议室
     * @param intoAddRequest
     * @return
     */
    @PostMapping("/create")
    @AuthCheck(anyRole = {"admin","user","root"})
    public BaseResponse<Long> intoRoom(@RequestBody IntoAddRequest intoAddRequest){
        if (intoAddRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        
        Long result = roomIntoService.addInto(intoAddRequest);
        if (result==0) {
            throw new BusinessException(ErrorCode.OPERATION_ERROR);
        }
        return ResultUtils.success(result);
    }

    /**
     * 退出会议室
     * @param intoQuiteRequest
     * @return
     */
    @PostMapping("/delete")
    @AuthCheck(anyRole = {"admin","user","root"})
    public BaseResponse<Boolean> quiteRoom(@RequestBody IntoQuiteRequest intoQuiteRequest) {
        if (intoQuiteRequest==null||intoQuiteRequest.getRoomId() == null || intoQuiteRequest.getRoomId() <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"会议室不存在");
        }
        if (intoQuiteRequest.getUserId() == null || intoQuiteRequest.getUserId() <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"用户不存在");
        }
        RoomInto roomInto = new RoomInto();
        BeanUtils.copyProperties(intoQuiteRequest,roomInto);
        Boolean result = roomIntoService.deleteInto(roomInto);
        if (!result) {
            throw new BusinessException(ErrorCode.SYSTEM_ERROR,"操作失败");
        }
        return ResultUtils.success(result);
    }

    /**
     * 获取记录列表
     * @param intoQueryRequest
     * @return
     */
    @AuthCheck(anyRole = {"admin","root"})
    @GetMapping("/list")
    public BaseResponse<List<RoomIntoVO>> listRoomInto(IntoQueryRequest intoQueryRequest){
        RoomInto roomIntoQuery = new RoomInto();
        if (intoQueryRequest!=null) {
            BeanUtils.copyProperties(intoQueryRequest,roomIntoQuery);
        }
        QueryWrapper<RoomInto> qw = new QueryWrapper<>(roomIntoQuery);
        List<RoomInto> roomIntoList = roomIntoService.list(qw);
        List<RoomIntoVO> roomIntoVOList =  roomIntoList.stream().map(roomInto->{
            RoomIntoVO roomIntoVO = new RoomIntoVO();
            BeanUtils.copyProperties(roomInto,roomIntoVO);
            return roomIntoVO;
        }).collect(Collectors.toList());
        return ResultUtils.success(roomIntoVOList);
    }

    /**
     * 分页获取记录列表
     * @param intoQueryRequest
     * @return
     */
    @AuthCheck(anyRole = {"admin","root"})
    @GetMapping("/list/page")
    public BaseResponse<Page<RoomIntoVO>> listRoomIntoByPage(IntoQueryRequest intoQueryRequest){
        long current = 1;
        long size = 10;
        RoomInto roomIntoQuery = new RoomInto();
        if (intoQueryRequest != null) {
            BeanUtils.copyProperties(intoQueryRequest,roomIntoQuery);
            current = intoQueryRequest.getCurrent();
            size = intoQueryRequest.getPageSize();
        }
        QueryWrapper<RoomInto> qw = new QueryWrapper<>(roomIntoQuery);
        Page<RoomInto> roomIntoPage = roomIntoService.page(new Page<>(current, size), qw);
        Page<RoomIntoVO> roomIntoVOPage = new PageDTO<>(roomIntoPage.getCurrent(), roomIntoPage.getSize(), roomIntoPage.getTotal());
        List<RoomIntoVO> roomIntoVOList = roomIntoPage.getRecords().stream().map(roomInto->{
            RoomIntoVO roomIntoVO = new RoomIntoVO();
            BeanUtils.copyProperties(roomInto,roomIntoVO);
            return roomIntoVO;
        }).collect(Collectors.toList());
        roomIntoVOPage.setRecords(roomIntoVOList);
        return ResultUtils.success(roomIntoVOPage);
    }
}
