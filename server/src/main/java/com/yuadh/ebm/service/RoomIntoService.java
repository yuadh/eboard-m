package com.yuadh.ebm.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.yuadh.ebm.model.dto.room.RoomAddRequest;
import com.yuadh.ebm.model.dto.roomInto.IntoAddRequest;
import com.yuadh.ebm.model.dto.roomInto.IntoGetRequest;
import com.yuadh.ebm.model.entity.RoomInto;

/**
* @author yuadh
* @description 针对表【room_into(用户绑定表)】的数据库操作Service
* @createDate 2023-01-23 17:40:03
*/
public interface RoomIntoService extends IService<RoomInto> {
    Long addInto(IntoAddRequest intoAddRequest);
    Boolean deleteInto(RoomInto roomInto);
    RoomInto getRoomInto(IntoGetRequest intoGetRequest);
}
