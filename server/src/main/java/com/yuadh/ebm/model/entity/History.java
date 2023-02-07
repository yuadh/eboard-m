package com.yuadh.ebm.model.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 会议记录表
 * @TableName history
 */
@TableName(value ="history")
@Data
public class History implements Serializable {
    /**
     * id
     */
    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * 进行的会议名称
     */
    private String conferenceName;

    /**
     * 会议室id
     */
    private Long roomId;

    /**
     * 会议室操作员id
     */
    private Long userId;

    /**
     * 完成标志符,0-未完成 1-完成
     */
    private Integer isFinish;

    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 完成时间
     */
    private Date finishTime;

    /**
     * 是否删除
     */
    private Integer isDelete;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}