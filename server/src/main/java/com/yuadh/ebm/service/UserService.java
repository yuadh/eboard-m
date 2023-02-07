package com.yuadh.ebm.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.yuadh.ebm.model.dto.user.UserAddRequest;
import com.yuadh.ebm.model.entity.User;

import javax.servlet.http.HttpServletRequest;

/**
* @author yuadh
* @description 针对表【user(用户)】的数据库操作Service
* @createDate 2023-01-18 14:04:52
*/
public interface UserService extends IService<User> {
    /**
     * 用户注册
     * @param userAccount
     * @param userPassword
     * @param checkPassword
     * @return
     */
    long userRegister(String userAccount,String userPassword,String checkPassword);

    /**
     * 用户更新
     * @param user
     * @return
     */
    long userUpdata(User user);
    
    
    
    
    /**
     * 用户登录
     * @param userAccount
     * @param userPassword
     * @param request
     * @return
     */
    User userLogin(String userAccount, String userPassword, HttpServletRequest request);
    
    /**
     * 获取当前用户
     * @param request
     * @return
     */
    User getLoginUser(HttpServletRequest request);

    /**
     * 是否为管理员
     * @param request
     * @return
     */
    boolean isAdmin(HttpServletRequest request);

    /**
     * 用户注销
     * @param request
     * @return
     */
    boolean userLogout(HttpServletRequest request);

    /**
     * 获取用户总数
     * @return
     */
    Long getUserCount();
}
