package com.yuadh.ebm.model.dto.roomInto;


import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class IntoAddRequest implements Serializable {
    /**
     * 用户id
     */
    private Long userId;
    
    /**
     * 会议室名
     */
    private String roomName;

    /**
     * 会议室密码
     */
    private String roomPassword;
    
    private static final long serialVersionUID = 1L;
}
