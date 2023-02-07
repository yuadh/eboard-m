package com.yuadh.ebm.model.dto.equipment;


import lombok.Data;

import java.io.Serializable;

@Data
public class EquipmentAddRequest implements Serializable {
    /**
     * 设备编码
     */
    private String equipmentCode;

    /**
     * 设备信息
     */
    private String equipmentMsg;

    /**
     * 会议室id 0-未加入
     */
    private Long roomId;

    /**
     *  0-正常 1-封禁
     */
    private Integer equipmentStatus;
    
    private static final long serialVersionUID = 1L;
}
