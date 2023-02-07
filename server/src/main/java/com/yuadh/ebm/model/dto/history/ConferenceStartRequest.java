package com.yuadh.ebm.model.dto.history;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class ConferenceStartRequest implements Serializable {
    /**
     * id
     */
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
    
    private static final long serialVersionUID = 1L;
}
