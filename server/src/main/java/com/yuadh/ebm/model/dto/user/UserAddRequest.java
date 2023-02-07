package com.yuadh.ebm.model.dto.user;

import lombok.Data;

import java.io.Serializable;

/**
 * 用户创建请求
 *
 * @author yupi
 */
@Data
public class UserAddRequest implements Serializable {
    /**
     * 账号
     */
    private String userAccount;

    /**
     * 密码
     */
    private String userPassword;

    /**
     *  user-普通用户 admin-超级管理员
     */
    private String userRole;

    /**
     *  0-正常 1-封禁
     */
    private Integer userStatus;

    private static final long serialVersionUID = 1L;
}