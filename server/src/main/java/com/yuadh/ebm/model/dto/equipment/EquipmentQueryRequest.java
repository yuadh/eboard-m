package com.yuadh.ebm.model.dto.equipment;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.yuadh.ebm.common.PageRequest;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class EquipmentQueryRequest extends PageRequest implements Serializable {
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

    private static final long serialVersionUID = 1L;
}
