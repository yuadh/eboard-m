package com.yuadh.ebm.model.dto.equipment;

import lombok.Data;

import java.io.Serializable;

@Data
public class UpdateScrrenRequest implements Serializable {
    /**
     * id
     */
    private Long id;

    /**
     * 设备屏幕图片
     */
    private String equipmentScreen;

    private static final long serialVersionUID = 1L;
}
