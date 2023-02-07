package com.yuadh.ebm.model.vo;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class HistoryCountVO implements Serializable {

    /**
     * 当日日期
     */
    private Date date;

    /**
     * 会议数
     */
    private Long count;
    
    public HistoryCountVO(Date date,Long count){
        this.date = date;
        this.count = count;
    }

    private static final long serialVersionUID = 1L;
}
