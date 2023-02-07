package com.yuadh.ebm.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.yuadh.ebm.common.ErrorCode;
import com.yuadh.ebm.exception.BusinessException;
import com.yuadh.ebm.mapper.RoomMapper;
import com.yuadh.ebm.model.entity.Room;
import com.yuadh.ebm.model.enums.CommonStatusEnum;
import com.yuadh.ebm.model.vo.RoomVO;
import com.yuadh.ebm.service.RoomService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

import javax.annotation.Resource;
import java.util.List;
import java.util.stream.Collectors;

/**
* @author yuadh
* @description 针对表【room(会议室表)】的数据库操作Service实现
* @createDate 2023-01-23 17:39:59
*/
@Service
public class RoomServiceImpl extends ServiceImpl<RoomMapper, Room>
    implements RoomService {
    
    @Resource
    RoomMapper roomMapper;
    
    /**
     * 加密盐
     */
    private static final String SALT = "eboard";
    
    
    @Override
    public Long updateRoom(Room room) {
        String roomName = room.getRoomName();
        String roomPassword = room.getRoomPassword();
        Integer equipmentCount = room.getEquipmentCount();
        Integer roomStatus = room.getRoomStatus();
        // 1. 校验
        if (StringUtils.isAnyBlank(roomName, roomPassword)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "参数为空");
        }
        if (roomName.length()<4||roomPassword.length()<6) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "会议室用户名或密码过短");
        }
        if (equipmentCount<=0||equipmentCount>40) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "会议室设备容量设备错误");
        }
        if (!CommonStatusEnum.getValues().contains(roomStatus)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "状态设置异常");
        }
        synchronized (roomName.intern()){

            boolean saveResult;
            if (room.getId()==null) {
                QueryWrapper<Room> qw = new QueryWrapper<>();
                qw.eq("roomName", roomName);
                long count = roomMapper.selectCount(qw);
                if (count>0) {
                    throw new BusinessException(ErrorCode.PARAMS_ERROR,"会议室已存在");
                }
                String encryptPassword = DigestUtils.md5DigestAsHex((SALT + roomPassword).getBytes());
                room.setRoomPassword(encryptPassword);
                saveResult = this.save(room);
            }else {
                String encryptPassword = DigestUtils.md5DigestAsHex((SALT + roomPassword).getBytes());
                room.setRoomPassword(encryptPassword);
                saveResult=this.updateById(room);
            }
            if (!saveResult) {
                throw new BusinessException(ErrorCode.SYSTEM_ERROR,"注册失败，数据库错误");
            }
            return room.getId();
        }
    }

    @Override
    public Room getRoomByName(String roomName) {
        QueryWrapper<Room> qw = new QueryWrapper<>();
        qw.eq("roomName",roomName);
        Room room = roomMapper.selectOne(qw);
        return room;
    }

    @Override
    public List<RoomVO> listByUserId(Long userId) {
        if (userId<=0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"参数错误");
        }
        return roomMapper.findByUserId(userId);
    }

    @Override
    public List<RoomVO> listByAdminId(Long adminId) {
        QueryWrapper<Room> qw = new QueryWrapper<>();
        qw.eq("adminId",adminId);
        List<Room> rooms = roomMapper.selectList(qw);
        List<RoomVO> listRoomVO=  rooms.stream().map(room->{
            RoomVO roomVO = new RoomVO();
            BeanUtils.copyProperties(room,roomVO);
            return roomVO;
        }).collect(Collectors.toList());
        if (listRoomVO==null) {
            throw new BusinessException(ErrorCode.SYSTEM_ERROR,"未获取到数据");
        }
        return listRoomVO;
    }
    
    @Override
    public boolean isInRoom(Long roomId) {
        QueryWrapper<Room> qw = new QueryWrapper<>();
        qw.eq("id",roomId);
        Long count = roomMapper.selectCount(qw);
        if (count>0) {
            return true;
        }
        return false;
    }

    @Override
    public boolean isNameIn(String roomName) {
        QueryWrapper<Room> qw = new QueryWrapper<>();
        qw.eq("roomName",roomName);
        Long count = roomMapper.selectCount(qw);
        if (count>0) {
            return true;
        }
        return false;
    }

    @Override
    public Integer getEquipmentCount(int roomId) {
        Room room = roomMapper.selectById(roomId);
        return room.getEquipmentCount();
    }

    @Override
    public Long getRoomCount(int adminId) {
        QueryWrapper<Room> qw = new QueryWrapper<>();
        if (adminId == 0) {
            qw.eq("isDelete",0);
            return roomMapper.selectCount(qw);
        }
        qw.eq("adminId",adminId);
        Long result = roomMapper.selectCount(qw);
        return result;
    }
}




