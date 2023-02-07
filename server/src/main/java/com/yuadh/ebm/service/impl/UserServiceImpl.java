package com.yuadh.ebm.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.yuadh.ebm.common.ErrorCode;
import com.yuadh.ebm.exception.BusinessException;
import com.yuadh.ebm.mapper.UserMapper;
import com.yuadh.ebm.model.entity.User;
import com.yuadh.ebm.model.enums.CommonStatusEnum;
import com.yuadh.ebm.model.enums.UserRoleEnum;
import com.yuadh.ebm.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import static com.yuadh.ebm.constant.UserConstant.ADMIN_ROLE;
import static com.yuadh.ebm.constant.UserConstant.USER_LOGIN_STATE;

/**
* @author yuadh
* @description 针对表【user(用户)】的数据库操作Service实现
* @createDate 2023-01-18 14:04:52
*/
@Service
@Slf4j
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {
    
    @Resource
    private UserMapper userMapper;

    /**
     * 加密盐
     */
    private static final String SALT = "yuadh";
    
    @Override
    public long userRegister(String userAccount, String userPassword, String checkPassword) {
        // 1. 校验
        if (StringUtils.isAnyBlank(userAccount, userPassword, checkPassword)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "参数为空");
        }
        if (userAccount.length() < 4) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "用户账号过短");
        }
        if (userPassword.length() < 6 || checkPassword.length() < 6) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "用户密码过短");
        }
        // 密码和校验密码相同
        if (!userPassword.equals(checkPassword)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "两次输入的密码不一致");
        }
        synchronized (userAccount.intern()){
            QueryWrapper<User> qw = new QueryWrapper<>();
            qw.eq("userAccount",userAccount);
            long count = userMapper.selectCount(qw);
            if (count>0) {
                throw new BusinessException(ErrorCode.PARAMS_ERROR,"账号重复");
            }
            String encryptPassword = DigestUtils.md5DigestAsHex((SALT + userPassword).getBytes());
            User user = new User();
            user.setUserAccount(userAccount);
            user.setUserPassword(encryptPassword);
            boolean saveResult = this.save(user);
            if (!saveResult) {
                throw new BusinessException(ErrorCode.SYSTEM_ERROR,"注册失败，数据库错误");
            }
            return user.getId();
        }
    }

    @Override
    public long userUpdata(User user) {
        String userAccount = user.getUserAccount();
        String userPassword = user.getUserPassword();
        Integer userStatus = user.getUserStatus();
        String userRole = user.getUserRole();
        // 1. 校验
        if (StringUtils.isAnyBlank(userAccount, userPassword,userRole)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "参数为空");
        }
        if (userAccount.length() < 4) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "用户账号过短");
        }
        if (userPassword.length() < 6 ) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "用户密码过短");
        }
        if (!CommonStatusEnum.getValues().contains(userStatus)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "账号状态设置异常");
        }
        if (!UserRoleEnum.getValues().contains(userRole)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "账号权限设置异常");
        }
        synchronized (userAccount.intern()){
            String encryptPassword = DigestUtils.md5DigestAsHex((SALT + userPassword).getBytes());
            user.setUserPassword(encryptPassword);
            boolean optionResult;
            if (user.getId()==null) {
                QueryWrapper<User> qw = new QueryWrapper<>();
                qw.eq("userAccount",userAccount);
                long count = userMapper.selectCount(qw);
                if (count>0) {
                    throw new BusinessException(ErrorCode.PARAMS_ERROR,"账号重复");
                }
                optionResult = this.save(user);
            }else {
                optionResult=this.updateById(user);
            }
            if (!optionResult) {
                throw new BusinessException(ErrorCode.SYSTEM_ERROR,"注册失败，数据库错误");
            }
            return user.getId();
        }
    }


    @Override
    public User userLogin(String userAccount, String userPassword, HttpServletRequest request) {
        if (StringUtils.isAnyBlank(userAccount,userPassword)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"参数为空");
        }
        if (userAccount.length() < 4) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "账号错误");
        }
        if (userPassword.length() < 6) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "密码错误");
        }
        String encryptPassword = DigestUtils.md5DigestAsHex((SALT + userPassword).getBytes());
        QueryWrapper<User> qw = new QueryWrapper<>();
        qw.eq("userAccount",userAccount);
        qw.eq("userPassword",encryptPassword);
        User user = userMapper.selectOne(qw);
        if (user==null) {
            log.info("user login faild,userAccount connot match userPassword");
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "用户不存在或密码错误");
        }
        request.getSession().setAttribute(USER_LOGIN_STATE,user);
        return user;
    }

    @Override
    public User getLoginUser(HttpServletRequest request) {
        // 先判断是否已登录
        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User currentUser = (User) userObj;
        if (currentUser == null || currentUser.getId() == null) {
            throw new BusinessException(ErrorCode.NOT_LOGIN_ERROR);
        }
        // 从数据库查询（追求性能的话可以注释，直接走缓存）
        long userId = currentUser.getId();
        currentUser = this.getById(userId);
        if (currentUser == null) {
            throw new BusinessException(ErrorCode.NOT_LOGIN_ERROR);
        }
        return currentUser;
    }

    @Override
    public boolean isAdmin(HttpServletRequest request) {
        // 仅管理员可查询
        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User user = (User) userObj;
        return user != null && ADMIN_ROLE.equals(user.getUserRole());
    }

    @Override
    public boolean userLogout(HttpServletRequest request) {
        if (request.getSession().getAttribute(USER_LOGIN_STATE) == null) {
            throw new BusinessException(ErrorCode.OPERATION_ERROR, "未登录");
        }
        // 移除登录态
        request.getSession().removeAttribute(USER_LOGIN_STATE);
        return true;
    }

    @Override
    public Long getUserCount() {
        QueryWrapper<User> qw = new QueryWrapper<>();
        qw.eq("isDelete",0);
        Long result = userMapper.selectCount(qw);
        return result;
    }
}




