package com.yuadh.ebm.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.yuadh.ebm.common.ErrorCode;
import com.yuadh.ebm.exception.BusinessException;
import com.yuadh.ebm.mapper.EquipmentMapper;
import com.yuadh.ebm.model.entity.Equipment;
import com.yuadh.ebm.model.enums.CommonStatusEnum;
import com.yuadh.ebm.model.vo.InRoomEquipmentVO;
import com.yuadh.ebm.service.EquipmentService;
import com.yuadh.ebm.service.RoomService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.stream.Collectors;

/**
* @author yuadh
* @description 针对表【equipment(设备表)】的数据库操作Service实现
* @createDate 2023-01-23 17:39:52
*/
@Service
public class EquipmentServiceImpl extends ServiceImpl<EquipmentMapper, Equipment>
    implements EquipmentService {
    
    @Resource
    EquipmentMapper equipmentMapper;
    
    @Resource
    RoomService roomService;
    
    @Override
    public long updataEquip(Equipment equipment) {
        String equipmentCode = equipment.getEquipmentCode();
        String equipmentMsg = equipment.getEquipmentMsg();
        Long roomId = equipment.getRoomId();
        Integer equipmentStatus = equipment.getEquipmentStatus();

        // 1. 校验
        if (StringUtils.isAnyBlank(equipmentCode, equipmentMsg)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "参数为空");
        }
        if (roomId<0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "参数异常");
        }
        if (roomId>0&&!roomService.isInRoom(roomId)) {
            //对是否是正确的会议室进行校验
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "会议室不存在");
        }
        if (!CommonStatusEnum.getValues().contains(equipmentStatus)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "状态设置异常");
        }
        synchronized (equipmentCode.intern()){
            
            boolean optionResult;
            if (equipment.getId()==null) {
                QueryWrapper<Equipment> qw = new QueryWrapper<>();
                qw.eq("equipmentCode",equipmentCode);
                long count = equipmentMapper.selectCount(qw);
                if (count>0) {
                    throw new BusinessException(ErrorCode.PARAMS_ERROR,"设备已存在");
                }
                optionResult = this.save(equipment);
            }else {
                optionResult=this.updateById(equipment);
            }
            if (!optionResult) {
                throw new BusinessException(ErrorCode.SYSTEM_ERROR,"注册失败，数据库错误");
            }
            return equipment.getId();
        }
    }

    @Override
    public List<InRoomEquipmentVO> getAllByConditions(boolean hasRoom, int adminId) {
        QueryWrapper<Equipment> qw = new QueryWrapper<>();
        if (hasRoom) {
            //查询已加入会议室设备列表
            if(adminId==0) {
                //查询所有设备列表
                return equipmentMapper.getListInRoom();
            }else {
                //查询指定管理员id设备列表
                return equipmentMapper.getListByAdminId(adminId);
            }
        }else {
            //查询未加入会议室设备列表
            qw.eq("roomId",0);
        }
        List<Equipment> equipments = equipmentMapper.selectList(qw);
        List<InRoomEquipmentVO> listInRoomEquipmentVO=  equipments.stream().map(equipment->{
            InRoomEquipmentVO inRoomEquipmentVO = new InRoomEquipmentVO();
            BeanUtils.copyProperties(equipment,inRoomEquipmentVO);
            inRoomEquipmentVO.setRoomName("未加入会议室中");
            return inRoomEquipmentVO;
        }).collect(Collectors.toList());
        return listInRoomEquipmentVO;
    }

    @Override
    public Integer getEquipmentCountByRoomId(int roomId) {
        QueryWrapper<Equipment> qw = new QueryWrapper<>();
        if (roomId==0) {
            qw.eq("isDelete",0);
            List<Equipment> equipments = equipmentMapper.selectList(qw);
            return equipments.size();
        }
        qw.eq("roomId",roomId);
        List<Equipment> equipmentList = equipmentMapper.selectList(qw);
        return equipmentList.size();
    }

    @Override
    public Long getEquipCountByAdminId(int adminId) {
        if (adminId==0) {
            QueryWrapper<Equipment> qw = new QueryWrapper<>();
            qw.eq("isDelete",0);
            return equipmentMapper.selectCount(qw);
        }
        Long result = (long)equipmentMapper.getEquipmentCountByAdminId(adminId);
        return result;
    }

    @Override
    public Boolean setIp(String equipmentCode, String ip) {
        QueryWrapper<Equipment> qw = new QueryWrapper<>();
        qw.eq("equipmentCode",equipmentCode);
        Equipment equipment = equipmentMapper.selectOne(qw);
        if (equipment!=null) {
            equipment.setEquipmentIp(ip);
            equipmentMapper.updateById(equipment);
            return true;
        }
        return false;
    }
    
}




