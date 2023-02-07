package com.yuadh.ebm.model.dto.user;

import lombok.Data;

import java.io.Serializable;

/**
 * 用户更新请求
 *
 * @author yupi
 */
@Data
public class UserUpdateRequest implements Serializable {
    /**
     * id
     */
    private Long id;

    /**
     * 账号
     */
    private String userAccount;

    /**
     * 密码
     */
    private String userPassword;

    /**
     * 昵称
     */
    private String userName;

    /**
     * 头像
     */
    private String userAvater;

    /**
     * 性别
     */
    private Integer gender;

    /**
     * 电话
     */
    private String phone;

    /**
     * 邮箱
     */
    private String email;
    

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