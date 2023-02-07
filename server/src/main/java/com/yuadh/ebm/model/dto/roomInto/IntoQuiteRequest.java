package com.yuadh.ebm.model.dto.roomInto;


import lombok.Data;

import java.io.Serializable;

@Data
public class IntoQuiteRequest implements Serializable {
    /**
     * 用户id
     */
    private Long userId;

    /**
     * 会议室id
     */
    private Long roomId;

    private static final long serialVersionUID = 1L;
}
