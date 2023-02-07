package com.yuadh.ebm.model.vo;


import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 在会议室中的设备视图
 * 
 * @author yuadh 
 */
@Data
public class InRoomEquipmentVO implements Serializable {
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
     * 会议室名
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

