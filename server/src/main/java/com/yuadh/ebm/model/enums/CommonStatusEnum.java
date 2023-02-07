package com.yuadh.ebm.model.enums;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public enum CommonStatusEnum {
    NORMAL("正常", 0),
    BANED("封禁", 1);

    private final String text;

    private final int value;

    CommonStatusEnum(String text, int value) {
        this.text = text;
        this.value = value;
    }

    /**
     * 获取值列表
     *
     * @return
     */
    public static List<Integer> getValues() {
        return Arrays.stream(values()).map(item -> item.value).collect(Collectors.toList());
    }

    public int getValue() {
        return value;
    }

    public String getText() {
        return text;
    }
}
