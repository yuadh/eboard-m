package com.yuadh.ebm.model.vo;


import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class EquipmentVO implements Serializable {
    /**
     * id
     */
    private Long id;

    /**
     * 设备编码
     */
    private String equipmentCode;

    /**
     * 设备信息
     */
    private String equipmentMsg;

    /**
     * 设备屏幕图片
     */
    private String equipmentScreen;

    /**
     * 设备ip
     */
    private String equipmentIp;

    /**
     * 会议室id 0-未加入
     */
    private Long roomId;

    /**
     * 会议室管理员
     */
    private String roomName;
    
    /**
     *  0-正常 1-封禁
     */
    private Integer equipmentStatus;

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
