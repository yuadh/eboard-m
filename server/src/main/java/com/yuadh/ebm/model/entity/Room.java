package com.yuadh.ebm.model.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 会议室表
 * @TableName room
 */
@TableName(value ="room")
@Data
public class Room implements Serializable {
    /**
     * id
     */
    @TableId(type = IdType.AUTO)
    private Long id;

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