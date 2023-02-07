package com.yuadh.ebm.model.vo;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
 * 管理界面视图
 * 用户数 - 设备数 - 会议室数 - 会议记录数
 * 近期开会记录 - 当日会议数据
 * @author yuadh 
 */
@Data
public class InitVO implements Serializable {
    
    private Long userCount;
    
    private Long equipmentCount;
    
    private Long roomCount;
    
    private Long historyCount;
    
    private List<HistoryCountVO> mouthData;
    
    private HistoryCountVO todayData;
    
    public InitVO(Long userCount, Long equipmentCount, Long roomCount, Long historyCount,List<HistoryCountVO> mouthData, HistoryCountVO todayData){
        this.userCount = userCount;
        this.equipmentCount = equipmentCount;
        this.roomCount = roomCount;
        this.historyCount = historyCount;
        this.mouthData = mouthData;
        this.todayData = todayData;
    }
    
    private static final long serialVersionUID = 1L;
}
