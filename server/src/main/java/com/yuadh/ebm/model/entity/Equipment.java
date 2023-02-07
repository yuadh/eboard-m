package com.yuadh.ebm.model.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 设备表
 * @TableName equipment
 */
@TableName(value ="equipment")
@Data
public class Equipment implements Serializable {
    /**
     * id
     */
    @TableId(type = IdType.AUTO)
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

    /**
     * 是否删除 0-正常 1-删除
     */
    @TableLogic
    private Integer isDelete;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}