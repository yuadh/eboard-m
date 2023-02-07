package com.yuadh.ebm.model.dto.roomInto;


import com.yuadh.ebm.common.PageRequest;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class IntoQueryRequest extends PageRequest implements Serializable {
    /**
     * id
     */
    private Long id;

    /**
     * 用户id
     */
    private Long userId;

    /**
     * 会议室id
     */
    private Long roomId;

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
