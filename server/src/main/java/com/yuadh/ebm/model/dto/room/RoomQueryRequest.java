package com.yuadh.ebm.model.dto.room;


import com.yuadh.ebm.common.PageRequest;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class RoomQueryRequest extends PageRequest implements Serializable {
    /**
     * id
     */
    private Long id;

    /**
     * 会议室名称
     */
    private String roomName;

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

    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 更新时间
     */
    private Date updateTime;
    
    private static final long serialVersionUID = 1L;
}
