package com.yuadh.ebm.model.vo;

import lombok.Data;

import java.io.Serializable;

@Data
public class NowRoomDataVO implements Serializable {
    /**
     * id 房间id
     */
    private Long id;

    /**
     * roomName会议室名称
     */
    private String roomName;

    /**
     * 是否正在进行会议标志Flag  0-空闲 1-进行中
     */
    private Integer flag;

    /**
     * 会议室设备容量
     */
    private Integer equipmentCount;

    /**
     * 会议室已有设备总数
     */
    private Integer inRoomEquipmenCount;

    private static final long serialVersionUID = 1L;
}
