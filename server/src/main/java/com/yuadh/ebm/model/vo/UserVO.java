package com.yuadh.ebm.model.vo;


import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class UserVO implements Serializable {
 
    private Long id;

    /**
     * 账号
     */
    private String userAccount;

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
     * openId
     */
    private String openId;

    /**
     *  user-普通用户 admin-超级管理员
     */
    private String userRole;

    /**
     *  0-正常 1-封禁
     */
    private Integer userStatus;

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
