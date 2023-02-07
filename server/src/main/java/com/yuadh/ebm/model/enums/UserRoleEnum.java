package com.yuadh.ebm.model.enums;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public enum UserRoleEnum {
    USER("普通用户", "user"),
    ADMIN("超级管理员", "admin");

    private final String text;

    private final String value;

    UserRoleEnum(String text, String value) {
        this.text = text;
        this.value = value;
    }

    /**
     * 获取值列表
     *
     * @return
     */
    public static List<String> getValues() {
        return Arrays.stream(values()).map(item -> item.value).collect(Collectors.toList());
    }

    public String getValue() {
        return value;
    }

    public String getText() {
        return text;
    }
}
