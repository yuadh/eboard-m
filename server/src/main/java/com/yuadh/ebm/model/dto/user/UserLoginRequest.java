package com.yuadh.ebm.model.dto.user;

import lombok.Data;

import java.io.Serializable;

/**
 * 用户登录请求体
 *
 * @author yupi
 */
@Data
public class UserLoginRequest implements Serializable {

    private String userAccount;

    private String userPassword;

    private static final long serialVersionUID = 1L;
}
