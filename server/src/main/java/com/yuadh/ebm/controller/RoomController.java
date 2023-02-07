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
import com.yuadh.ebm.model.dto.room.RoomUpdateRequest;
import com.yuadh.ebm.model.entity.Room;
import com.yuadh.ebm.model.entity.User;
import com.yuadh.ebm.model.vo.RoomVO;
import com.yuadh.ebm.service.RoomService;
import com.yuadh.ebm.service.UserService;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;
import javax.annotation.Resource;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/room")
public class RoomController {
    @Resource
    RoomService roomService;
    @Resource
    UserService userService;
    
    
    // region 增删改查

    /**
     * 添加会议室
     * @param roomAddRequest
     * @return
     */
    @AuthCheck(anyRole = {"admin","user","root"})
    @PostMapping("/create")
    public BaseResponse<Long> addRoom(@RequestBody RoomAddRequest roomAddRequest){
        if (roomAddRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Room room = new Room();

        BeanUtils.copyProperties(roomAddRequest,room);
        long equipmentResult = roomService.updateRoom(room);
        if (equipmentResult==0) {
            throw new BusinessException(ErrorCode.OPERATION_ERROR);
        }
        return ResultUtils.success(equipmentResult);
    }

    /**
     * 根据Id删除会议室
     * @param deleteRequest
     * @return
     */
    @AuthCheck(anyRole = {"admin","user","root"})
    @PostMapping("/delete")
    public BaseResponse<Boolean> deleteRoom(@RequestBody DeleteRequest deleteRequest) {
        if (deleteRequest==null||deleteRequest.getId() == null || deleteRequest.getId() <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        boolean result = roomService.removeById(deleteRequest.getId());
        if (!result) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"会议室不存在");
        }
        return ResultUtils.success(result);
    }

    /**
     * 更新会议室
     * @param roomUpdateRequest
     * @return
     */
    @AuthCheck(anyRole = {"admin","user","root"})
    @PostMapping("/update")
    public BaseResponse<Long> updateRoom(@RequestBody RoomUpdateRequest roomUpdateRequest) {
        if (roomUpdateRequest == null || roomUpdateRequest.getId() == null||roomUpdateRequest.getId()<0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        User user = userService.getById(roomUpdateRequest.getAdminId());
        if (user==null||user.getId()<=0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"管理员id出错");
        }
        Room room = new Room();
        BeanUtils.copyProperties(roomUpdateRequest, room);
        long equipmentResult = roomService.updateRoom(room);
        if (equipmentResult==0) {
            throw new BusinessException(ErrorCode.OPERATION_ERROR);
        }
        return ResultUtils.success(equipmentResult);
    }

    /**
     * 根据 id 获取会议室
     * @param id
     * @return
     */
    @AuthCheck(anyRole = {"admin","user","root"})
    @GetMapping("/get")
    public BaseResponse<RoomVO> getRoomById(int id) {
        if (id <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Room room = roomService.getById(id);
        if (room==null) {
            throw new BusinessException(ErrorCode.OPERATION_ERROR,"未查询到设备");
        }
        RoomVO roomVO = new RoomVO();
        BeanUtils.copyProperties(room, roomVO);
        return ResultUtils.success(roomVO);
    }
    
    // 条件查询
    /**
     * 根据 管理员id 获取会议室
     * @param adminId
     * @return
     */
    @AuthCheck(anyRole = {"admin","user","root"})
    @GetMapping("/get/adminId")
    public BaseResponse<List<RoomVO>> getRoomsByAdminId(int adminId) {
        if (adminId <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        List<RoomVO> roomVOS = roomService.listByAdminId((long)adminId);
        if (roomVOS==null) {
            throw new BusinessException(ErrorCode.OPERATION_ERROR,"未查询到会议室");
        }
       
        return ResultUtils.success(roomVOS);
    }

    /**
     * 根据 用户id 获取所在会议室
     * @param userId
     * @return
     */
    @AuthCheck(anyRole = {"admin","user","root"})
    @GetMapping("/get/userId")
    public BaseResponse<List<RoomVO>> getRoomsByUserId(int userId) {
        if (userId <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        List<RoomVO> roomVOS = roomService.listByUserId((long)userId);
        if (roomVOS==null) {
            throw new BusinessException(ErrorCode.OPERATION_ERROR,"未查询到会议室");
        }
        return ResultUtils.success(roomVOS);
    }

    /**
     * 获取会议室数据
     * @param roomQueryRequest
     * @return
     */
    @AuthCheck(anyRole = {"admin","user","root"})
    @GetMapping("/list")
    public BaseResponse<List<RoomVO>> listEquipment(RoomQueryRequest roomQueryRequest){
        Room roomQuery = new Room();
        if (roomQueryRequest!=null) {
            BeanUtils.copyProperties(roomQueryRequest,roomQuery);
        }
        QueryWrapper<Room> qw = new QueryWrapper<>(roomQuery);
        List<Room> roomList = roomService.list(qw);
        List<RoomVO> roomVOList =  roomList.stream().map(room->{
            RoomVO roomVO = new RoomVO();
            BeanUtils.copyProperties(room,roomVO);
            User user = userService.getById(room.getAdminId());
            if (user!=null) {
                roomVO.setAdminName(user.getUserName());
            }else {
                roomVO.setAdminName("暂无数据");
            }
            return roomVO;
        }).collect(Collectors.toList());
        return ResultUtils.success(roomVOList);
    }

    /**
     * 分页获取会议室数据
     * @param roomQueryRequest
     * @return
     */
    @AuthCheck(anyRole = {"admin","user","root"})
    @GetMapping("/list/page")
    public BaseResponse<Page<RoomVO>> listEquipmentByPage(RoomQueryRequest roomQueryRequest){
        long current = 1;
        long size = 10;
        Room roomQuery = new Room();
        if (roomQueryRequest != null) {
            BeanUtils.copyProperties(roomQueryRequest,roomQuery);
            current = roomQueryRequest.getCurrent();
            size = roomQueryRequest.getPageSize();
        }
        QueryWrapper<Room> qw = new QueryWrapper<>(roomQuery);
        Page<Room> roomPage = roomService.page(new Page<>(current, size), qw);
        Page<RoomVO> roomVOPage = new PageDTO<>(roomPage.getCurrent(), roomPage.getSize(), roomPage.getTotal());
        List<RoomVO> roomVOList = roomPage.getRecords().stream().map(room->{
            RoomVO roomVO = new RoomVO();
            BeanUtils.copyProperties(room,roomVO);
            return roomVO;
        }).collect(Collectors.toList());
        roomVOPage.setRecords(roomVOList);
        return ResultUtils.success(roomVOPage);
    }
    
    
}
