package com.yuadh.ebm.model.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 
 * @TableName history_details
 */
@TableName(value ="history_details")
@Data
public class HistoryDetails implements Serializable {
    /**
     * id
     */
    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * 会议记录id
     */
    private Long historyId;

    /**
     * 进行的会议名称
     */
    private String conferenceName;

    /**
     * 会议内容
     */
    private String content;

    /**
     * 会议室操作员id
     */
    private Long userId;

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
    @TableLogic
    private Integer isDelete;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}