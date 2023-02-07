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
import com.yuadh.ebm.model.dto.equipment.*;
import com.yuadh.ebm.model.entity.Equipment;
import com.yuadh.ebm.model.entity.Room;
import com.yuadh.ebm.model.vo.EquipmentVO;
import com.yuadh.ebm.model.vo.InRoomEquipmentVO;
import com.yuadh.ebm.service.EquipmentService;
import com.yuadh.ebm.service.RoomService;
import com.yuadh.ebm.service.UserService;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author yuadh
 */
@RestController
@RequestMapping("/equipment")
public class EquipmentController {
    
    @Resource
    EquipmentService equipmentService;
    @Resource
    RoomService roomService;
    
    // region 增删改查
    
    /**
     * 添加设备
     * @param equipmentAddRequest
     * @return
     */
    @AuthCheck(anyRole = {"admin","user","root"})
    @PostMapping("/create")
    public BaseResponse<Long> addEquipment(@RequestBody EquipmentAddRequest equipmentAddRequest){
        if (equipmentAddRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Equipment equipment = new Equipment();

        BeanUtils.copyProperties(equipmentAddRequest,equipment);
        long equipmentResult = equipmentService.updataEquip(equipment);
        if (equipmentResult==0) {
            throw new BusinessException(ErrorCode.OPERATION_ERROR);
        }
        return ResultUtils.success(equipmentResult);
    }

    /**
     * 根据Id删除设备
     * @param deleteRequest
     * @return
     */
    @AuthCheck(anyRole = {"admin","user","root"})
    @PostMapping("/delete")
    public BaseResponse<Boolean> deleteEquipment(@RequestBody DeleteRequest deleteRequest) {
        if (deleteRequest==null||deleteRequest.getId() == null || deleteRequest.getId() <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        boolean result = equipmentService.removeById(deleteRequest.getId());
        if (!result) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"设备不存在");
        }
        return ResultUtils.success(result);
    }

    /**
     * 更新设备
     * @param equipmentUpdateRequest
     * @return
     */
    @AuthCheck(anyRole = {"admin","user","root"})
    @PostMapping("/update")
    public BaseResponse<Long> updateEquipment(@RequestBody EquipmentUpdateRequest equipmentUpdateRequest) {
        if (equipmentUpdateRequest == null || equipmentUpdateRequest.getId() == null||equipmentUpdateRequest.getId()<0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Equipment equipment = new Equipment();
        BeanUtils.copyProperties(equipmentUpdateRequest, equipment);
        long equipmentResult = equipmentService.updataEquip(equipment);
        if (equipmentResult==0) {
            throw new BusinessException(ErrorCode.OPERATION_ERROR);
        }
        return ResultUtils.success(equipmentResult);
    }
    /**
     * 根据 id 获取设备
     * @param id
     * @return
     */
    @AuthCheck(anyRole = {"admin","user","root"})
    @GetMapping("/get")
    public BaseResponse<EquipmentVO> getEquipmentById(int id) {
        if (id <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Equipment equipment = equipmentService.getById(id);
        if (equipment==null) {
            throw new BusinessException(ErrorCode.OPERATION_ERROR,"未查询到设备");
        }
        EquipmentVO equipmentVO = new EquipmentVO();
        BeanUtils.copyProperties(equipment, equipmentVO);
        return ResultUtils.success(equipmentVO);
    }


    /**
     * 通过会议室号 获取会议记录列表
     * @param updateScrrenRequest
     * @return
     */
    @AuthCheck(anyRole = {"admin","user","root"})
    @PostMapping("/update/screen")
    public BaseResponse<Boolean> updateScreen(@RequestBody UpdateScrrenRequest updateScrrenRequest) {
        if (updateScrrenRequest.getId() <= 0|| updateScrrenRequest.getEquipmentScreen()==null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"请求错误");
        }
        Equipment equipment = equipmentService.getById(updateScrrenRequest.getId());
        if (equipment==null) {
            throw new BusinessException(ErrorCode.OPERATION_ERROR,"设备不存在");
        }
        equipment.setEquipmentScreen(updateScrrenRequest.getEquipmentScreen());

        boolean ruslut = equipmentService.updateById(equipment);

        return ResultUtils.success(ruslut);
    }
    //多条件查询

    /**
     * 根据条件获取设备列表
     *  hasRoom: true-有会议室 false-无会议室
     *  adminId：0-所有 adminId>1:指定管理员
     * @param conditionsRequest
     * @return
     */
    @AuthCheck(anyRole = {"admin","user","root"})
    @GetMapping("/get/conditions")
    public BaseResponse<List<InRoomEquipmentVO>> getListByConditions(ConditionsRequest conditionsRequest){
        if (conditionsRequest==null||conditionsRequest.getAdminId()==null||conditionsRequest.getHasRoom()==null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"参数为空");
        }
        Integer adminId = conditionsRequest.getAdminId();
        Boolean hasRoom = conditionsRequest.getHasRoom();
        if (adminId<0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        List<InRoomEquipmentVO> listResult = equipmentService.getAllByConditions(hasRoom, adminId);
        return ResultUtils.success(listResult);
    }
    /**
     * 根据 id 获取设备
     * @param roomId
     * @return
     */
    @AuthCheck(anyRole = {"admin","user","root"})
    @GetMapping("/get/roomid")
    public BaseResponse<List<EquipmentVO>> getEquipmentByRoomId(int roomId) {
        if (roomId <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        QueryWrapper<Equipment> qw = new QueryWrapper<>();
        qw.eq("roomId", roomId);
        List<Equipment> listResult = equipmentService.list(qw);
        if (listResult==null) {
            throw new BusinessException(ErrorCode.OPERATION_ERROR,"未查询到设备");
        }
        List<EquipmentVO> listEquipmentVO=  listResult.stream().map(equipment->{
            EquipmentVO equipmentVO = new EquipmentVO();
            BeanUtils.copyProperties(equipment,equipmentVO);
            return equipmentVO;
        }).collect(Collectors.toList());
        return ResultUtils.success(listEquipmentVO);
    }

    /**
     * 获取设备列表
     * @param equipmentQueryRequest
     * @return
     */
    @AuthCheck(anyRole = {"admin","user","root"})
    @GetMapping("/list")
    public BaseResponse<List<EquipmentVO>> listEquipment(EquipmentQueryRequest equipmentQueryRequest){
        Equipment equipmentQuery = new Equipment();
        if (equipmentQueryRequest!=null) {
            BeanUtils.copyProperties(equipmentQueryRequest,equipmentQuery);
        }
        QueryWrapper<Equipment> qw = new QueryWrapper<>(equipmentQuery);
        List<Equipment> equipList = equipmentService.list(qw);
        List<EquipmentVO> equipmentVOList =  equipList.stream().map(equipment->{
            EquipmentVO equipmentVO = new EquipmentVO();
            BeanUtils.copyProperties(equipment,equipmentVO);
            Room room = roomService.getById(equipment.getRoomId());
            if (room!=null) {
                equipmentVO.setRoomName(room.getRoomName());
            }else {
                equipmentVO.setRoomId((long)0);
            }
            return equipmentVO;
        }).collect(Collectors.toList());
        return ResultUtils.success(equipmentVOList);
    }
    
    /**
     * 分页获取用户数据
     * @param equipmentQueryRequest
     * @return
     */
    @AuthCheck(anyRole = {"admin","user","root"})
    @GetMapping("/list/page")
    public BaseResponse<Page<EquipmentVO>> listEquipmentByPage(EquipmentQueryRequest equipmentQueryRequest){
        long current = 1;
        long size = 10;
        Equipment equipmentQuery = new Equipment();
        if (equipmentQueryRequest != null) {
            BeanUtils.copyProperties(equipmentQueryRequest,equipmentQuery);
            current = equipmentQueryRequest.getCurrent();
            size = equipmentQueryRequest.getPageSize();
        }
        QueryWrapper<Equipment> qw = new QueryWrapper<>(equipmentQuery);
        Page<Equipment> equipmentPage = equipmentService.page(new Page<>(current, size), qw);
        Page<EquipmentVO> equipmentVOPage = new PageDTO<>(equipmentPage.getCurrent(), equipmentPage.getSize(), equipmentPage.getTotal());
        List<EquipmentVO> equipmentVOList = equipmentPage.getRecords().stream().map(equipment->{
            EquipmentVO equipmentVO = new EquipmentVO();
            BeanUtils.copyProperties(equipment,equipmentVO);
            return equipmentVO;
        }).collect(Collectors.toList());
        equipmentVOPage.setRecords(equipmentVOList);
        return ResultUtils.success(equipmentVOPage);
    }
}
