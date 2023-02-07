package com.yuadh.ebm.model.dto.room;


import lombok.Data;

import java.io.Serializable;

@Data
public class RoomAddRequest  implements Serializable {

    /**
     * 会议室名称
     */
    private String roomName;

    /**
     * 会议室密码
     */
    private String roomPassword;

    /**
     * 会议室信息
     */
    private String roomMsg;

    /**
     * 设备容量
     */
    private Integer equipmentCount;

    /**
     * 创建会议室的管理员id
     */
    private Long adminId;

    /**
     *  0-正常 1-封禁
     */
    private Integer roomStatus;
    
    private static final long serialVersionUID = 1L;
}
