package com.yuadh.ebm.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.IService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.yuadh.ebm.common.ErrorCode;
import com.yuadh.ebm.exception.BusinessException;
import com.yuadh.ebm.mapper.RoomIntoMapper;
import com.yuadh.ebm.mapper.RoomMapper;
import com.yuadh.ebm.model.dto.room.RoomAddRequest;
import com.yuadh.ebm.model.dto.roomInto.IntoAddRequest;
import com.yuadh.ebm.model.dto.roomInto.IntoGetRequest;
import com.yuadh.ebm.model.entity.Room;
import com.yuadh.ebm.model.entity.RoomInto;
import com.yuadh.ebm.model.enums.CommonStatusEnum;
import com.yuadh.ebm.service.RoomIntoService;
import com.yuadh.ebm.service.RoomService;
import com.yuadh.ebm.service.UserService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

import javax.annotation.Resource;

/**
* @author yuadh
* @description 针对表【room_into(用户绑定表)】的数据库操作Service实现
* @createDate 2023-01-23 17:40:03
*/
@Service
public class RoomIntoServiceImpl extends ServiceImpl<RoomIntoMapper, RoomInto>
    implements RoomIntoService {
    
    @Resource
    UserService userService;
    @Resource
    RoomService roomService;
    @Resource
    RoomIntoMapper roomIntoMapper;

    private static final String SALT = "eboard";
    
    @Override
    public Long addInto(IntoAddRequest intoAddRequest) {
        String roomName = intoAddRequest.getRoomName();
        String roomPassword = intoAddRequest.getRoomPassword();
        Long userId = intoAddRequest.getUserId();
        Room room = roomService.getRoomByName(roomName);
        // 1. 校验
        if (StringUtils.isAnyBlank(roomName, roomPassword)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "参数为空");
        }
        if (userId<=0||userService.getById(userId)==null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "用户不存在");
        }
        if (!roomService.isNameIn(roomName)|| room==null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "会议室不存在");
        }
        synchronized (roomName.intern()){
            IntoGetRequest intoGetRequest = new IntoGetRequest();
            intoGetRequest.setUserId(userId);
            intoGetRequest.setRoomId(room.getId());
            RoomInto roomInto = this.getRoomInto(intoGetRequest);
            if (roomInto==null) {
                //验证密码是否通过
                String encryptPassword = DigestUtils.md5DigestAsHex((SALT + roomPassword).getBytes());
                boolean result = room.getRoomPassword().equals(encryptPassword);
                if (!result) {
                    throw new BusinessException(ErrorCode.PARAMS_ERROR, "会议室名或密码错误");
                }
                RoomInto saveRoomInto = new RoomInto();
                saveRoomInto.setUserId(userId);
                saveRoomInto.setRoomId(room.getId());
                this.save(saveRoomInto);
                return saveRoomInto.getId();
            }else {
                throw new BusinessException(ErrorCode.SYSTEM_ERROR, "已经在会议室中");
            }
        }
    }

    @Override
    public Boolean deleteInto(RoomInto roomInto) {
        Long roomId = roomInto.getRoomId();
        Long userId = roomInto.getUserId();
        if (roomId<=0 || roomService.getById(roomId)==null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "会议室或用户不存在");
        }
        if (userId<=0 || userService.getById(userId)==null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "会议室或用户不存在");
        }
        synchronized (roomId.toString().intern()){
            QueryWrapper<RoomInto> qw = new QueryWrapper<>();
            qw.eq("roomId",roomId);
            qw.eq("userId",userId);
            Long count = roomIntoMapper.selectCount(qw);
            if (count>0) {
                boolean result = this.remove(qw);
                return result;
            }else {
                throw new BusinessException(ErrorCode.PARAMS_ERROR, "绑定表记录不存在");
            }
        }
    }

    @Override
    public RoomInto getRoomInto(IntoGetRequest intoGetRequest) {
        Long roomId = intoGetRequest.getRoomId();
        Long userId = intoGetRequest.getUserId();

        QueryWrapper<RoomInto> qw = new QueryWrapper<>();
        qw.eq("roomId",roomId);
        qw.eq("userId",userId);
        RoomInto roomInto = roomIntoMapper.selectOne(qw);
        
        return roomInto;
    }
}




