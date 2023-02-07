package com.yuadh.ebm.model.dto.equipment;

import lombok.Data;

import java.io.Serializable;

@Data
public class ConditionsRequest implements Serializable {
    /**
     * 是否加入会议室
     */
    private Boolean hasRoom;

    /**
     * 管理员ID
     */
    private Integer adminId;

    private static final long serialVersionUID = 1L;
}
